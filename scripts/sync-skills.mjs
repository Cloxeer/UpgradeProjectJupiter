#!/usr/bin/env node

/**
 * Generates command/skill files for all supported AI coding platforms.
 * Source of truth: .claude/skills/<skill-name>/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SKILLS = [
  {
    name: 'clone-website',
    shortDesc:
      'Reverse-engineer and clone any website as a pixel-perfect replica',
    argumentHint: '<url>',
    geminiArgs: '{{args}}',
    noArgsReplace: (text) =>
      text.replace(/\$ARGUMENTS/g, 'the target URL provided by the user'),
  },
  {
    name: 'extract-halite-template',
    shortDesc:
      'Extract a reference website into a HaliteWebDevelopment JSON template variant (not Next.js)',
    argumentHint: '<referenceUrl> <genre> <variantSlug> [haliteRepoPath]',
    geminiArgs: '{{args}}',
    noArgsReplace: (text) =>
      text
        .replace(/\$ARGUMENTS/g, 'the inputs provided by the user')
        .replace(
          /Parse `\$ARGUMENTS`/g,
          'Parse the user-provided arguments (referenceUrl, genre, variantSlug, optional haliteRepoPath)',
        ),
  },
];

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

const HEADER = (skillName) =>
  `<!-- AUTO-GENERATED from .claude/skills/${skillName}/SKILL.md \u2014 do not edit directly.\n` +
  `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

function parseSkill(sourcePath) {
  let raw;
  try {
    raw = readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    console.error(`Error: Source skill not found at ${sourcePath}`);
    process.exit(1);
  }

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`Error: Could not parse frontmatter in ${sourcePath}`);
    process.exit(1);
  }

  return { raw, body: match[2] };
}

function syncSkill(skill) {
  const sourcePath = join(ROOT, '.claude', 'skills', skill.name, 'SKILL.md');
  const { raw, body } = parseSkill(sourcePath);
  const noArgsBody = skill.noArgsReplace(body);
  const geminiBody = body.replace(/\$ARGUMENTS/g, skill.geminiArgs);
  const header = HEADER(skill.name);

  console.log(`Syncing ${skill.name}...`);
  console.log(`  Source: .claude/skills/${skill.name}/SKILL.md\n`);

  // 1. Codex CLI
  write(`.codex/skills/${skill.name}/SKILL.md`, raw);

  // 2. GitHub Copilot
  write(`.github/skills/${skill.name}/SKILL.md`, raw);

  // 3. Cursor
  write(`.cursor/commands/${skill.name}.md`, header + noArgsBody);

  // 4. Windsurf
  write(`.windsurf/workflows/${skill.name}.md`, header + noArgsBody);

  // 5. Gemini CLI
  write(
    `.gemini/commands/${skill.name}.toml`,
    `# AUTO-GENERATED from .claude/skills/${skill.name}/SKILL.md\n` +
      `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
      `description = "${skill.shortDesc}"\n` +
      `name = "${skill.name}"\n\n` +
      `prompt = '''\n${geminiBody}\n'''\n`,
  );

  // 6. OpenCode
  write(
    `.opencode/commands/${skill.name}.md`,
    `---\ndescription: "${skill.shortDesc}"\n---\n${header}${body}`,
  );

  // 7. Augment Code
  write(
    `.augment/commands/${skill.name}.md`,
    `---\ndescription: "${skill.shortDesc}"\nargument-hint: "${skill.argumentHint}"\n---\n${header}${body}`,
  );

  // 8. Continue
  write(
    `.continue/commands/${skill.name}.md`,
    `---\nname: ${skill.name}\ndescription: "${skill.shortDesc}"\ninvokable: true\n---\n${header}${body}`,
  );

  // 9. Amazon Q
  write(
    `.amazonq/cli-agents/${skill.name}.json`,
    JSON.stringify(
      {
        name: skill.name,
        description: skill.shortDesc,
        prompt: noArgsBody,
        fileContext: ['AGENTS.md', 'docs/research/**'],
      },
      null,
      2,
    ) + '\n',
  );

  console.log('');
}

console.log('Syncing skills to all platforms...\n');

for (const skill of SKILLS) {
  syncSkill(skill);
}

console.log(`Done! ${SKILLS.length} skills \u00d7 9 platform files generated.`);
