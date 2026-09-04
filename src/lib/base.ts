/** Base path for static hosting under a sub-folder (GitHub Pages project sites). Empty for root hosting. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an absolute public asset path (e.g. "/images/x.jpg") with the base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
