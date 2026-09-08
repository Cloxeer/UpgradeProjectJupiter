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
  overall: "What it costs and who pays: about 8% of the $50 billion first phase (2.5% of the $165 billion bond cap, a ceiling, not cash), most of the capture line repayable by the federal 45Q credit. Most of it is the developer's, and the greenhouses are the growers' money, not the county's.",
  expert: "Every line below is an estimate or a cited figure, shown as a share of the $50 billion first-phase commitment and of the $165 billion bond cap (a ceiling, not cash), with the payer named.",
  homeowner: "None of this is on your bill. The developer pays for capture, heat and the water plant; growers pay for the greenhouses. NMSU warns desalinated water costs more to make than well water, so the lease should fix who pays that difference; the point is that your supply goes up.",
  legislator: "Total added capital is about 8% of the $50 billion first phase (2.5% of the bond cap, a ceiling, not cash), before the federal 45Q credit. The county funds nothing; the lease conditions assign each item to the developer or to growers, and the companies' $250,000 desalination study in the CBA becomes a built plant.",
  business: "Capital by line item, payer and basis. About $470 million is grower capital for greenhouses; the developer's items recover through the federal 45Q credit, heat and lease revenue and water sales.",
  kid: "It costs about two and a half cents for every dollar of the whole deal, and the government pays most of that back for catching the gas. The company pays for the rest. The farmers pay for the greenhouses. Your family pays nothing.",
};

export const timelineKid: Record<number, string> = {
  0: "Right now they are pouring concrete. A judge paused their air permit and their water well. None of our ideas is in the deal yet.",
  1: "Next year the first sheds close up. We want the heat box and the gas-catching pipes put in as they build, and the paperwork for the big storage pipe and the water plant sent in.",
  2: "The plant turns on. Our meters measure every chimney, but the big pipe that takes the gas to the storage rock is not built yet, so for now the sky looks the same as in their plan. The water machine is being built.",
  5: "Five years on: the water machine turns on, the big pipe is connected and the gas catcher starts catching for real, the first greenhouses are growing, and the town's cleaned water starts going back into the ground.",
  10: "Ten years on: the gas catcher is at its target, about 3,000 jobs, food from next door, and the gas machines resting more every year.",
  15: "Fifteen years on: the town has had clean water and local food for a whole childhood.",
  20: "Twenty years on: the law says the plant must count as clean by 2045, but it lets a gas plant count by cutting other pollution somewhere else. Our plan asks for the real thing: fewer gas hours every year, measured, as far as hot rock and wind can go.",
  25: "Twenty-five years on: the whole site is built out, with water, food, power and training on one piece of land.",
  30: "Thirty years on: the deal ends and the land goes back on the tax rolls. Our plan paid schools about $1 billion along the way; theirs paid $360 million.",
};

/** A short plain-words note under the takeaway where readers get stuck. Facts here already appear, cited, in the card below. */
export const takeawayNotes: Record<string, string> = {
  "Process 1 · Heat":
    "Can heat make cooling? An absorption chiller runs on hot water instead of electricity, the way a propane camping fridge does, but standard units want water near 90 °C and this loop is 45 to 65 °C, so no summer cooling is counted here. Winter is real here: Santa Teresa nights drop into the 20s and 30s °F from December to February, so a greenhouse needs root heat on every cold night from November to March. This is not about making more power: the heat is already there and free. Their plan blows it into the sky; ours puts it to work so 150 acres of greenhouses grow food year-round. The gain is measured in food and jobs, not megawatts.",
};

/** The one line each reader most wants, per process. Everyone and Expert get the net-gain-for-humanity line. */
export const takeaways: Record<string, Record<Audience, string>> = {
  "Process 1 · Heat": {
    overall: "Net gain for humanity: free heat that was going to the sky now warms greenhouse roots in winter and preheats the water plant all year; summer cooling stays evaporative.",
    expert: "Net gain for humanity: ≈100 MW of reject heat put to work on winter nights (≈10 MW year-round for desal preheat), about 1% of the stream on average, for about $60M of standard hardware paid back by heat sold to growers, not fan savings; absorption cooling not counted at 45–65 °C.",
    homeowner: "Your takeaway: the heat that would blow across the desert toward your street heats greenhouses instead, and your neighborhood gets the food.",
    legislator: "Your takeaway: the cheapest condition on the list, about $60M paid by the developer, and it makes the greenhouse jobs possible.",
    business: "Your takeaway: heat becomes a product with a buyer, and the fans you already pay for run less.",
    kid: "The computers' heat grows tomatoes instead of being thrown away.",
  },
  "Process 2 · Carbon": {
    overall: "Net gain for humanity: the gas is caught, used and counted instead of released over a town that already fails the smog standard.",
    expert: "Net gain for humanity: a 90–95% capture target on a ~95%-pure stream, metered, used where buyers exist and stored for the rest, with continuous monitoring on every cluster and permit limits set for the capture configuration.",
    homeowner: "Your takeaway: the exhaust that drifts toward Sunland Park becomes a number you can check instead of smog you cannot see.",
    legislator: "Your takeaway: a monitored permit with metered capture is the permit that survives review; the unmonitored one, with emissions estimated from one 65 kW test unit, is the one stayed in court.",
    business: "Your takeaway: a captured, monitored plant is the one that ends the litigation and the moratorium talk, and the CO₂ has buyers.",
    kid: "The gas gets caught in a box instead of floating over your house.",
  },
  "Process 3 · Water": {
    overall: "Net gain for humanity: the towns need 6 million gallons a day next year and the plant to make 5 of them from salty water is already designed; this condition has the developer build it instead of paying for a study, open about 2031, with the towns' used water put back into the ground once the state permit is granted.",
    expert: "Net gain for humanity: 5 MGD brackish RO at 75% recovery, NMSU-designed, $269.5M system, brine minimized by heat and injected below the aquifer; no Phase 1 surplus (CRRUA 6 MGD 2027); ~2 MGD reclaimed recharge from year 5 under NMSA 72-5A.",
    homeowner: "Your takeaway: nothing changes at your tap until about 2031; then 5 million gallons a day from salty water replaces pumping from the fresh wells the towns depend on, and the towns' used water starts going back into the ground.",
    legislator: "Your takeaway: the CBA's $250,000 buys a study; the county is building a 4 MGD plant with $15M of Jupiter tax money; this condition has the developer fund the full $269.5M NMSU system so that tax money stays with schools, delivered by year 5, and files the recharge permit in year 1 (Albuquerque's took six years).",
    business: "Your takeaway: a designed, priced plant with a utility customer whose demand hits 15 MGD by 2042, built by year 5, no surplus to sell in Phase 1.",
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

/** Their plan, as filed, in their own terms: what the theirs mode of each process card says. No net-gain framing. Sources: CBA, BOCC packet, NMED Statement of Basis (cited on the cards). */
export const theirsCards: Record<string, { title: string; takeaway: Partial<Record<Audience, string>> & { overall: string; expert: string }; kidTakeaway: string }> = {
  "Process 1 · Heat": {
    title: "Heat blown into the air",
    takeaway: {
      overall: "As filed: all the computers' heat goes out through big fans into the sky, and nobody is offered it.",
      homeowner: "As filed: the warm air from the fans blows across the desert toward your street, and none of that heat warms anything or grows anything for your town.",
      legislator: "As filed: neither the community benefits agreement nor the permit papers say a word about the heat, so nothing obliges the developer to offer it to anyone.",
      business: "As filed: the fans that throw the heat away are a cost with no revenue line, and the heat itself is never priced or sold.",
      expert: "As filed: a closed-loop dry-cooling system rejects all of the roughly 2,462 MW of server heat to the air, and neither the CBA nor the permit filings offer that heat to anyone.",
    },
    kidTakeaway: "The computers' heat goes to giant fans that blow it into the sky, and nobody uses it.",
  },
  "Process 2 · Carbon": {
    title: "Gas fuel cells, exhaust to the sky",
    takeaway: {
      overall: "As filed: the gas power plant may put 8.8 million tons of CO₂ into the air every year, nothing is caught, and no meter on the chimneys is required.",
      homeowner: "As filed: the exhaust drifts over the houses next door every day and night, nobody measures it at the chimneys, and the clean-energy promise for 2031 is paper credits, not cleaner air.",
      legislator: "As filed: the permit allows 8.8 million tons of CO₂ a year, requires no meter on the chimneys, and the 2031 clean-energy pledge and the 2045 net-zero law can both be met on paper with credits and offsets.",
      business: "As filed: 8.8 million tons of CO₂ a year with nothing caught, no meters, and no credit income, while the air permit sits stayed in court.",
      expert: "As filed: 2,462 MW of gas fuel cells permitted for 8,820,970 tons of CO₂e a year (10.1 million applied for; the developers expect about 40% less), no capture, emission factors from four 4-hour tests of one 65 kW unit with no continuous stack monitors required, “100% carbon-free energy matching by 2031” as an accounting commitment, and HB93 net-zero by 2045 with methane offsets allowed.",
    },
    kidTakeaway: "The power machines breathe out gas into the sky all day and all night, and nobody measures each chimney.",
  },
  "Process 3 · Water": {
    title: "Town water in, a fund and a study out",
    takeaway: {
      overall: "As filed: the campus draws town drinking water under a cap, pumps an old farm's water for its fills, and pays for a $250,000 study of a water plant, not the plant.",
      homeowner: "As filed: the campus takes water from the same town pipe and the same fresh wells your house depends on, and it makes no new water for your tap.",
      legislator: "As filed: the agreement caps drinking water at 20,000 gallons a day, leaves the other water volume unstated, gives a $50 million fund and a $250,000 study, and the county is building its own water plant with $15 million of the project's tax money.",
      business: "As filed: a $50 million payment to the water utility and a $250,000 study, with no water plant on the books and no water to sell.",
      expert: "As filed: a potable cap of 20,000 gallons a day on average (60,000 at peak), an undisclosed non-potable operating volume, 103 million gallons pumped April to August 2026 under an emergency authorization, a $50M water fund (about $25M collected, flowing early 2027), $250,000 toward a desalination study, and the county building its own 4 MGD STAR plant with $15M of Jupiter tax money.",
    },
    kidTakeaway: "The computer place takes some drinking water from the town pipe and pays money into a water fund, and the town builds its own water machine.",
  },
  "Process 4 · Retire the gas": {
    title: "Gas fuel cells, all year, plus batteries",
    takeaway: {
      overall: "As filed: gas fuel cells run all day every day, with batteries; the clean-energy promise for 2031 is paper credits, not the machines.",
      homeowner: "As filed: the gas machines never rest, so there is no hour of the year without exhaust over your neighborhood, and the gas pipe to feed them has been refused twice.",
      legislator: "As filed: the lease has no schedule for cutting gas hours; the 2031 promise is met with credits, and the 2045 net-zero law can be met with offsets, so nothing changes at the machines.",
      business: "As filed: gas is the largest running cost, bought all year at an unfixed price, and the pipeline to deliver it has been refused twice and delayed to 2027.",
      expert: "As filed: 2,462 MW of Bloom fuel cells on natural gas 8,760 hours a year plus battery storage, fed by the 17.7-mile Green Chile lateral (up to 400 MMcf/day) whose state-trust segment was denied on Mar. 20 and July 15, 2026, with carbon-free matching by 2031 through credits.",
    },
    kidTakeaway: "The gas machines run every hour of every day, and the gas pipe to feed them has been told no twice.",
  },
  "Process 5 · Food & jobs": {
    title: "750 jobs, no greenhouses",
    takeaway: {
      overall: "As filed: 750 full-time jobs are promised in the lease, 1,500 advertised, and the land beside the coolers stays empty.",
      homeowner: "As filed: 750 full-time jobs are promised for your area, no food is grown, and the land next to the fans stays bare desert.",
      legislator: "As filed: the binding number is 750 full-time and 50 part-time jobs within 3 years, the advertised 1,500 is not in the agreement, and nothing in it covers greenhouses or training.",
      business: "As filed: a $12 million a year payment in lieu of taxes, 750 binding jobs, and no lease income from the empty land beside the coolers.",
      expert: "As filed: 750 full-time and 50 part-time jobs binding within 3 years (1,500 advertised) at a $75k–$100k average wage, at least 2,500 construction jobs, $4M for workforce programs, a $1M habitat fund and $12M a year in lieu of taxes; no greenhouses and no training institute.",
    },
    kidTakeaway: "The deal promises 750 jobs and some money for the town, and the land next to the fans stays empty desert.",
  },
};
