// Blueprint page text per audience. Everyone = plain; Expert = the technical text already in the components;
// Homeowner / Legislator / Business = their own framing; Little kid = the kid's future in a few words.
import type { Audience } from "@/components/jupiter/Audience";

type V = Partial<Record<Audience, string>> & { overall: string };

export const heroVoice: Record<"sub" | "guide", V> = {
  sub: {
    overall: "Their buildings, their fence, their site. Same timeline. Here is what we would add, drawn so you can play with it.",
    expert: "Their buildings, their fence, their site, their timeline. Every number here is cited; sources sit in a dropdown under each part.",
    homeowner: "The same campus they are building, with the parts that change your water, your air and your street drawn in green.",
    legislator: "The six lease conditions, drawn on the developers' own site plan, with the record and the cost of each.",
    business: "The same site with the revenue lines drawn in: leases, water sales, heat sales, CO₂ sales and a lower gas bill.",
    kid: "This is the giant computer place. Green things are what we want to add so your town gets clean air, water and food.",
  },
  guide: {
    overall: "Answer two questions, then tap any building or part, drag the sliders, and use “Make bigger” to fill your screen with any drawing.",
    expert: "Two questions, then explore: tap any building or part, drag the sliders, and use “Make bigger” to fill your screen with any drawing.",
    homeowner: "Pick a plan, tap the things near your house, and drag the sliders to see how much water, food and clean air each one adds.",
    legislator: "Pick a plan and tap each condition to see its cost, its precedent and the document behind it.",
    business: "Pick a plan and tap each part for its capital cost, its payer and its revenue.",
    kid: "Tap the pictures. Slide the sliders. Green is our plan. Red is their plan.",
  },
};

/** One plain line per zone for little kids, shown instead of the two paragraphs. */
export const zoneKid: Record<string, string> = {
  future: "Empty desert they have not built on yet. That is where the greenhouses could go.",
  pipeline: "A big pipe that brings gas to the power plant.",
  fuel: "The power plant. It makes electricity for the computers and breathes out gas.",
  ops: "Offices, a warehouse, and parking for the people who work here.",
  halls: "Four giant sheds full of computers. They get very hot.",
  power: "Machines that cool the hot water from the computers.",
  dry: "Giant fans that blow the computers' heat into the sky. We want to use the heat first.",
  capture: "Our box that catches the gas from the power plant before it floats away.",
  solar: "Solar panels on the roofs and in a strip along the fans.",
  institute: "A packing house for the food and a school that teaches people the jobs.",
  water: "Our machine that turns salty water into clean water for 16,700 homes a day.",
  greenhouse: "Our greenhouses, warmed by the computers, growing tomatoes and lettuce all year.",
  buffer: "A strip of desert kept open around the edge.",
};

/** Short zone names for little kids (the acre strip). */
export const zoneKidName: Record<string, string> = {
  future: "Empty desert",
  pipeline: "Gas pipe",
  fuel: "Power plant",
  ops: "Offices and parking",
  halls: "Computer sheds",
  power: "Cooling machines",
  dry: "Giant fans",
  capture: "Gas-catching box",
  solar: "Solar panels",
  institute: "Packing house and school",
  water: "Clean-water machine",
  greenhouse: "Greenhouses",
  buffer: "Open strip for animals",
};

/** Kid steps under each process drawing: three to five words each. */
export const kidSteps: Record<string, string[]> = {
  "Process 1 · Heat": ["Computers get hot", "Warm water leaves", "Our box passes the heat on", "Tomatoes get warm, glass gets cool", "Fans blow the rest away"],
  "Process 2 · Carbon": ["Power plant breathes out gas", "Dryer takes the water out", "Box catches the gas", "Some feeds plants and concrete", "The rest goes deep underground"],
  "Process 3 · Water": ["Salty water comes up", "Computer heat warms it", "Filter takes the salt out", "Clean water goes to homes", "Salt goes deep down, never back"],
  "Process 4 · Retire the gas": ["Sun on every roof", "Hot rock makes power at night", "Wind farm sends power by wire", "Gas machines rest more each year"],
  "Process 5 · Food & jobs": ["Warm water under the plants", "Gas from the box feeds them", "Tomatoes all year", "Trucks take the food to town", "About 3,000 jobs"],
};

export const costVoice: V = {
  overall: "What it costs and who pays: about 1.5% on top of the $165 billion bond. Most of it is the developer's, and the greenhouses are the growers' money, not the county's.",
  expert: "Every line below is an estimate or a cited figure, shown as a share of the $165 billion bond, with the payer named.",
  homeowner: "None of this is on your bill. The developer pays for capture, heat and the water plant; growers pay for the greenhouses. Your water rates go down when 5 million gallons a day is added, not up.",
  legislator: "Total added capital is about 1.5% of the bond. The county funds nothing; the lease conditions assign each item to the developer or to growers, and the $250,000 desalination study in the CBA becomes a built plant.",
  business: "Capital by line item, payer and basis. About $450 million is grower capital for greenhouses; the developer's items recover through lower electricity, leases and water sales.",
  kid: "It costs about one and a half cents for every dollar they are already spending. The company pays for most of it. The farmers pay for the greenhouses. Your family pays nothing.",
};

export const timelineKid: Record<number, string> = {
  0: "Right now they are pouring concrete. A judge paused their air permit and their water well. None of our ideas is in the deal yet.",
  1: "Next year the first sheds close up. We want the heat box and the gas-catching box put in as they build.",
  2: "The plant turns on. In our plan the gas box catches it from day one and the water machine starts making clean water.",
  5: "When you are a few years older: greenhouses are growing, the water machine has made billions of gallons, and hot rock and wind start taking over from gas.",
  10: "Ten years on: about 3,000 jobs, food from next door, and the gas machines resting more every year.",
  15: "Fifteen years on: the town has had clean water and local food for a whole childhood.",
  20: "Twenty years on: the law says zero gas by 2045. Our plan has a road to get there; theirs does not.",
  25: "Twenty-five years on: the whole site is built out, with water, food, power and training on one piece of land.",
  30: "Thirty years on: the deal ends and the land goes back on the tax rolls. Our plan paid schools about $1 billion along the way; theirs paid $360 million.",
  250: "Two hundred and fifty years on: the computers and the greenhouses are long gone. The gas we caught is stone. The deep wells are still there, and in our plan money was set aside in 2026 so someone is still paid to check them. In theirs, nobody wrote that part down.",
};

export const jupiterKid = {
  intro: "The real planet Jupiter has a giant storm on it. Left: their plan, and the storm gets bigger every year. Right: our plan, no storm. It is a joke, but the numbers are real.",
  filed: (year: number) => `In ${year} years, if nothing changes: the power plant has breathed out about ${(10.144 * Math.max(0, year - 2)).toFixed(0)} million tons of gas.`,
  upgraded: (year: number) => `In ${year} years, upgraded: the gas is caught, the heat grows food, and the water machine has made about ${(5 * 0.365 * Math.max(0, year - 2)).toFixed(0)} billion gallons of clean water.`,
};

/** A short plain-words note under the takeaway where readers get stuck. Facts here already appear, cited, in the card below. */
export const takeawayNotes: Record<string, string> = {
  "Process 1 · Heat":
    "How heat makes cooling: an absorption chiller runs on hot water instead of electricity, the way a propane camping fridge does. And winter is real here: Santa Teresa nights drop into the 20s and 30s °F from December to February, so a greenhouse needs root heat on every cold night from November to March. This is not about making more power: the heat is already there and free. Their plan blows it into the sky; ours puts it to work so 150 acres of greenhouses grow food year-round. The gain is measured in food and jobs, not megawatts.",
};

/** The one line each reader most wants, per process. Everyone and Expert get the net-gain-for-humanity line. */
export const takeaways: Record<string, Record<Audience, string>> = {
  "Process 1 · Heat": {
    overall: "Net gain for humanity: free heat that was going to the sky now grows food in winter and makes cooling in summer.",
    expert: "Net gain for humanity: ~105 MW of reject heat put to work year-round for about $60M of standard hardware, recovered in fan and chiller electricity.",
    homeowner: "Your takeaway: the heat that would blow across the desert toward your street heats greenhouses instead, and your neighborhood gets the food.",
    legislator: "Your takeaway: the cheapest condition on the list, about $60M paid by the developer, and it makes the greenhouse jobs possible.",
    business: "Your takeaway: heat becomes a product with a buyer, and the fans you already pay for run less.",
    kid: "The computers' heat grows tomatoes instead of being thrown away.",
  },
  "Process 2 · Carbon": {
    overall: "Net gain for humanity: the gas is caught, used and counted instead of released over a town that already fails the smog standard.",
    expert: "Net gain for humanity: 90–95% capture on a ~95%-pure stream, used first, stored as fallback, with continuous monitoring under one PSD-level permit.",
    homeowner: "Your takeaway: the exhaust that drifts toward Sunland Park becomes a number you can check instead of smog you cannot see.",
    legislator: "Your takeaway: one monitored permit with capture is the permit that survives review; the split, unmonitored one is the one stayed in court.",
    business: "Your takeaway: a captured, monitored plant is the one that ends the litigation and the moratorium talk, and the CO₂ has buyers.",
    kid: "The gas gets caught in a box instead of floating over your house.",
  },
  "Process 3 · Water": {
    overall: "Net gain for humanity: 5 million gallons a day of clean water made from water nobody could drink, added to the town's pipes.",
    expert: "Net gain for humanity: 5 MGD brackish RO at 75% recovery, NMSU-designed, $269.5M system, brine minimized by heat and injected below the aquifer.",
    homeowner: "Your takeaway: your tap gets 5 million gallons a day added, enough for about 16,700 homes, instead of water taken.",
    legislator: "Your takeaway: the $250,000 study in the CBA becomes a built plant delivered to CRRUA, for about 0.16% of the bond.",
    business: "Your takeaway: a designed, priced plant with a utility customer whose demand more than doubles by 2042.",
    kid: "Salty water goes in, clean water comes out for 16,700 homes every day.",
  },
  "Process 4 · Retire the gas": {
    overall: "Net gain for humanity: every hour the fuel cells rest is an hour of no exhaust, and those hours grow every year.",
    expert: "Net gain for humanity: geothermal at ~90% capacity factor plus delivered wind cut gas-equivalent hours directly; rooftop solar is the honest 1%.",
    homeowner: "Your takeaway: fewer hours of exhaust over your neighborhood every year, from hot rock under this valley and New Mexico's own wind.",
    legislator: "Your takeaway: HB93's 2045 zero gets a schedule in the lease, with Google's 396 MW geothermal purchase as the market precedent.",
    business: "Your takeaway: gas is your largest operating cost; geothermal and contracted wind cut it at fixed prices, and the ESG story writes itself.",
    kid: "Hot rock and wind make power, so the gas machines rest more every year.",
  },
  "Process 5 · Food & jobs": {
    overall: "Net gain for humanity: about 60 million pounds of local food a year and about 3,000 permanent jobs on land that was going to sit empty.",
    expert: "Net gain for humanity: ~150 acres at ~400,000 lb/acre/yr and ~6.5 jobs/acre, on grower capital, with heat and CO₂ supplied from the site.",
    homeowner: "Your takeaway: jobs you can drive to and food you can buy in town, from greenhouses next door.",
    legislator: "Your takeaway: greenhouse staffing is what lifts the enforceable job count from 750 to about 3,000, and the lease is where it is written.",
    business: "Your takeaway: 150 acres to lease with heat and CO₂ supplied, a packing house at the border, and a trained workforce.",
    kid: "Tomatoes and lettuce all year, and about 3,000 jobs.",
  },
};
