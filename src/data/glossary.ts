// Plain-language definitions for the technical words used on the site. `kid` is the swap-in phrase in kid mode.
export type GlossaryKey = "MW" | "GW" | "MGD" | "tpy" | "ppb" | "ugm3" | "PSD" | "TitleV" | "CO2e" | "acreFoot" | "brackish" | "captureEfficiency" | "IRB" | "CBA" | "nonattainment";

export const glossary: Record<GlossaryKey, { term: string; short: string; long: string; kid: string; sources?: string[] }> = {
  MW: {
    term: "MW",
    short: "megawatt: a rate of power, like miles per hour is a rate of speed",
    long: "One megawatt is a million watts, a rate of energy flow. As heat, 1 MW is about 38 home gas furnaces running flat out. As electricity, 1 MW is roughly what 750 U.S. homes draw on average. The campus needs 2,462 MW of electricity and throws off about the same in heat.",
    kid: "megawatts (one megawatt runs about 750 homes)",
    sources: ["carrier-furnace", "eia-homes", "notice"],
  },
  GW: { term: "GW", short: "gigawatt: 1,000 megawatts", long: "A gigawatt is a thousand megawatts. Their plant is about 2.4 GW.", kid: "gigawatts (one gigawatt runs about 750,000 homes)" },
  MGD: {
    term: "MGD",
    short: "million gallons a day",
    long: "Million gallons per day, the standard unit for water plants. 1 MGD is about the daily use of 3,300 homes at 300 gallons a home.",
    kid: "million gallons of water a day (one is enough for 3,300 homes)",
    sources: ["epa-watersense"],
  },
  tpy: { term: "tons/yr", short: "tons per year of a pollutant leaving the stacks", long: "Tons per year is how air permits count pollution. A ton is 2,000 pounds; a full dump truck carries about 10 tons.", kid: "tons a year (a dump truck holds about 10 tons)" },
  ppb: { term: "ppb", short: "parts per billion: how much of a gas is in the air", long: "Parts per billion. The health standard for ozone (smog) is 70 ppb averaged over 8 hours; above that, EPA says lungs are being harmed.", kid: "how much smog is in the air (70 is the limit for safe breathing)", sources: ["epa-ozone-naaqs"] },
  ugm3: { term: "µg/m³", short: "micrograms per cubic meter of air", long: "Micrograms per cubic meter, the unit for fine particles (PM2.5). The health standard is 9 µg/m³ averaged over a year.", kid: "how much soot is in the air", sources: ["epa-pm-naaqs"] },
  PSD: { term: "PSD", short: "Prevention of Significant Deterioration: the strict review for big polluters", long: "A federal permitting review that applies when a plant emits 250 tons a year or more of a pollutant. It requires the best available controls. The filed permit keeps each pollutant just under 250 tons, so the review is not triggered.", kid: "the strict pollution check for big plants", sources: ["sob"] },
  TitleV: { term: "Title V", short: "the operating permit for a major air-pollution source", long: "Title V of the Clean Air Act: the operating permit every major source must hold, with monitoring and public reporting.", kid: "the government's permission slip for a big polluter", sources: ["sob"] },
  CO2e: { term: "CO₂e", short: "carbon dioxide equivalent: all greenhouse gases counted as CO₂", long: "Carbon-dioxide equivalent. Methane and other gases are converted to the amount of CO₂ that would warm the planet the same amount, so one number covers them all.", kid: "planet-warming gas, counted as carbon dioxide" },
  acreFoot: { term: "acre-foot", short: "enough water to cover an acre one foot deep: 325,851 gallons", long: "An acre-foot is 325,851 gallons, about what three homes use in a year.", kid: "a big swimming pool of water (325,851 gallons)" },
  brackish: { term: "brackish", short: "salty groundwater, too salty to drink but far less salty than the sea", long: "Water with 1,000 to 10,000 milligrams of dissolved salt per liter. Seawater is about 35,000. It looks clear; the salt is dissolved.", kid: "salty water you cannot drink until the salt is taken out", sources: ["cduaws"] },
  captureEfficiency: { term: "capture efficiency", short: "the share of CO₂ the capture unit actually catches", long: "Not the same as purity. Purity (about 95%) is how much of the exhaust is CO₂. Efficiency (90–95%) is how much of that CO₂ the unit removes. Whatever it misses is released.", kid: "how much of the gas the catching box catches", sources: ["sob", "bloom-chart"] },
  IRB: { term: "IRB", short: "industrial revenue bonds: the $165B county deal that swaps property tax for lease payments", long: "Industrial revenue bonds. The county holds title to the project and leases it back, so the developer pays negotiated payments instead of property tax for 30 years. The lease is the county's enforcement tool.", kid: "the county's deal that lets the company skip normal property tax for 30 years", sources: ["cba", "county-qa"] },
  CBA: { term: "CBA", short: "Community Benefits Agreement: the signed contract with the county", long: "The Community Benefits Agreement signed Nov. 12, 2025. It sets the binding jobs (750 full-time), the water cap, the $11.4M in programs and the site size (about 819 acres).", kid: "the promise the company signed with the county", sources: ["cba"] },
  nonattainment: { term: "nonattainment", short: "an area that fails a federal air-quality standard", long: "EPA's label for an area whose air fails a health standard. Sunland Park has been an ozone nonattainment area since Aug. 3, 2018.", kid: "a place where the air already fails the safe-breathing test", sources: ["sunland-park-ozone"] },
};
