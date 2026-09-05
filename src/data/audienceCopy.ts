// Whole-page copy per audience. "overall" is the Earth voice, the default (air, water, land and people first);
// each other audience overrides the blocks below. Numbers are the same in every voice; only the wording changes.
import type { Audience } from "@/components/jupiter/Audience";
import { heroBullets, heroQuestion, whatIsParagraphs, pitches, willList, willNotList, updatesLead, ctaText } from "./upgrade";

export type Copy = {
  heroQuestion: string;
  heroBullets: { strong: string; rest: string }[];
  whatIsParagraphs: string[];
  highlightsIntro: string;
  pitches: { title: string; body: string }[];
  netlossLead: string;
  willTitle: string;
  willList: string[];
  willNotTitle: string;
  willNotList: string[];
  updatesLead: string;
  scienceIntro: string;
  ctaAfter: string;
  supportLead: string;
};

export const expertCopy: Copy = {
  heroQuestion,
  heroBullets,
  whatIsParagraphs,
  highlightsIntro: "Each card answers one line from their website. Ours is on top; theirs is quoted underneath, word for word. Tap a card and the math and sources open right inside it.",
  pitches,
  netlossLead: "The upgraded plan turns the same site into a net gain for the people, water, air and wildlife of Doña Ana County, and the gain grows every year it runs. On the developers' own filed numbers, the plan as filed is the opposite.",
  willTitle: "WILL (UPGRADED):",
  willList,
  willNotTitle: "WILL NOT (ACCEPT):",
  willNotList,
  updatesLead,
  scienceIntro: "The engineering behind each part of the upgrade now has its own page, with their original sections one click below ours. Here is the short version.",
  ctaAfter: ctaText.after,
  supportLead: "Tell Doña Ana County and the State of New Mexico: do not cancel Project Jupiter. Force the upgrade before the first fuel cell turns on.",
};

/** Earth: the default voice. Air, water, land and people first; the numbers second, as proof. Plain words, no jargon. */
export const overallCopy: Copy = {
  heroQuestion: "WHAT SHOULD PROJECT JUPITER MEAN FOR THE EARTH, AND FOR US?",
  heroBullets: [
    { strong: "Cleaner air.", rest: " The plant's exhaust is caught at the stack and used, instead of about 10 million tons of CO₂ a year going into a sky that already fails the smog standard." },
    { strong: "Water given back.", rest: " Salty groundwater nobody can drink becomes 5 million gallons a day of clean water for the towns next door, instead of drinking water being taken." },
    { strong: "Heat that feeds people.", rest: " The computers' warmth grows about 60 million pounds of food a year next door, instead of being blown into the desert." },
    { strong: "Less gas every year.", rest: " Hot rock under the valley and New Mexico's own wind take over more hours, so the gas machines rest more each year." },
    { strong: "Work for the people who live here.", rest: " About 3,000 permanent jobs instead of the 750 the company signed for, with a training school on site." },
    { strong: "", rest: "Same buildings, same timeline, about 1.5% more. This is the version the Earth can live with." },
  ],
  whatIsParagraphs: [
    "Project Jupiter is a giant data center being built near Sunland Park, with its own gas-fired power plant beside it. The county approved $165 billion in bonds for it in 2025. As filed, the plant would release about 10 million tons of CO₂ a year, more than Albuquerque and Las Cruces combined, over a valley whose air has failed the federal smog standard since 2018. It takes drinking water from the local utility and pumps more from the fresh aquifer under everyone's wells. All the computers' heat is blown into the desert. The company signed for 750 jobs.",
    "The upgrade does not cancel any of it. It keeps every building and the same schedule, and adds five things the Earth and the people here need: catch the CO₂ and use it, turn the heat into food and cooling, make clean water from the salty aquifer, replace gas hours with geothermal and wind, and put every ton of smog on a public meter. About 1.5% more. Pick who you are below if you want it explained your way.",
  ],
  highlightsIntro: "Eight things their website says, and what the air, the water and the people here get instead. Tap a card to see how we got the number.",
  pitches: [
    { title: "For the air", body: "The fuel cells' exhaust is about 95% CO₂ once dried, which is exactly why it can be caught. Capture skids in the fuel-cell yard, one air permit, and monitors on every stack with the readings public." },
    { title: "For the water", body: "Deep under the desert is salty water nobody can drink. NMSU already designed the plant that cleans it: 5 million gallons a day into the towns' pipes, so the aquifer under everyone's wells is left alone." },
    { title: "For the people", body: "The land beside the fans grows food all year. The training school is on site. About 3,000 jobs go to people who already live here, and the smog they breathe is measured instead of estimated." },
  ],
  netlossLead: "Pick a year. The green side is what the air, the water and the people here have gained by then under the upgrade. The red side is the plan as filed, on the company's own numbers.",
  willTitle: "THE UPGRADE GIVES THE EARTH AND THE VALLEY:",
  willList: ["The CO₂ caught and used, and every ton of smog on a public meter", "5 million gallons a day of clean water added, not taken", "About 60 million pounds of food a year grown on the computers' heat", "Gas machines that rest more every year as geothermal and wind take over", "About 3,000 permanent jobs for people who live here, instead of 750"],
  willNotTitle: "THE PLAN AS FILED GIVES THEM:",
  willNotList: ["About 10 million tons of CO₂ a year into the sky", "Each smog gas kept just under the strict-review line, over a town that already fails the standard", "Drinking water taken and more pumped from the fresh aquifer", "All the heat blown into the desert", "750 jobs and $12 million a year"],
  updatesLead: "Concrete is being poured now: 9% complete by the company's own report. A court has paused the air permit and the water well. None of the five conditions is in the county lease yet, so there is still time.",
  scienceIntro: "How each part works, explained for every reader, with the documents behind it.",
  ctaAfter: ctaText.after,
  supportLead: "Tell Doña Ana County: do not cancel Project Jupiter. Make it earn its place on this land before the first fuel cell turns on.",
};

const legislator: Copy = {
  heroQuestion: "WHAT SHOULD THE LEASE REQUIRE BEFORE THE FUEL CELLS ARRIVE?",
  heroBullets: [
    { strong: "Enforceable jobs.", rest: " About 3,000 permanent positions in Phase 1 written into the IRB lease, against the 750 the signed agreement requires today." },
    { strong: "A conditioned bond schedule.", rest: " About $1 billion over 30 years for schools, infrastructure and services, paid as verified jobs and stack emissions targets are met, against $360 million unconditioned." },
    { strong: "Water delivered, not studied.", rest: " The 5 MGD brackish plant NMSU priced at $269 million, built and handed to CRRUA, in place of the $250,000 desalination study the CBA funds." },
    { strong: "One permit, monitored.", rest: " Capture on the fuel-cell stacks from day one and continuous smog monitors with public data, in a county that already fails the federal ozone standard." },
    { strong: "Gas hours falling.", rest: " A geothermal share and delivered wind contracted in the lease, so the HB93 zero in 2045 has a schedule instead of a promise." },
    { strong: "", rest: "The county's only enforcement tool is the lease, and the lease is being finalized now. Three bills are drafted. The conditions cost the developer about 1.5% of the bond." },
  ],
  whatIsParagraphs: [
    "Project Jupiter is a data-center campus in Santa Teresa financed through $165 billion in Doña Ana County industrial revenue bonds. The county holds title and leases the project back, so the lease, not the permit, is where conditions bind. The signed Community Benefits Agreement of Nov. 12, 2025 describes about 819 acres with a 400-acre first phase, a minimum of 750 full-time jobs, a 20,000-gallon-a-day potable cap and $11.4 million in programs. NMED's draft air permit puts the fuel-cell plant at 2,462 MW and 10,144,115 tons of CO₂e a year, with each criteria pollutant held just under the 250-ton PSD threshold.",
    "The upgrade is five lease conditions, not a redesign: capture before power-on, one air permit with PSD-level controls and continuous monitoring, waste heat offered to growers at cost, the NMSU water plant funded, and bond payments tied to verified jobs and emissions. It keeps their halls, fuel cells, fence and schedule. Added cost is about 1.5% of the bond, most of it borne by growers rather than the developer.",
    "Status as of Sept. 2, 2026: the air-permit hearing and the construction well are stayed by the Supreme Court, the pipeline's state-land segment has been denied twice, quarterly job reports were missed, and construction is 9% complete by the developers' own report. None of the five conditions is in the lease.",
  ],
  highlightsIntro: "Eight of their published figures, each answered in the same unit with the arithmetic and the document behind it. Tap a card for the math you will be asked about.",
  pitches: [
    { title: "What the county can require", body: "Amend the IRB leases: capture before power-on, one air permit, heat offered to growers, the NMSU plant funded, bonds tied to jobs delivered. The county owns the land during the bond term; the lease is the only instrument that reaches the developer directly." },
    { title: "What the Legislature can pass", body: "Three drafted bills: Microgrid Oversight (SB 235 passed the Senate in 2026), Waste-Heat Reuse, and Data Center Standards. Each has a fiscal note that is small because the hardware is ordinary and the money is the developer's." },
    { title: "What the record shows", body: "Nov. 12, 2025 CBA; two State Land Office denials; 103 million gallons pumped under an emergency authorization now stayed; NMED draft permit July 29, 2026; Supreme Court stay Aug. 24 and refusal to lift it Sept. 1; missed employment reports. Every date links to its document." },
  ],
  netlossLead: "On the developers' filed numbers, each year of operation as filed adds emissions and water draw with no offsetting public asset. Under the five conditions the same years deliver water, food, verified jobs and bond revenue. Pick a year; every cell is cited.",
  willTitle: "THE FIVE CONDITIONS DELIVER:",
  willList: [
    "About $6.6 billion in Phase-1 economic impact on their own IMPLAN basis plus leases, heat and water sales, against their $4.7 billion†",
    "About $1 billion in conditioned bond payments over 30 years for schools, infrastructure and services, against $360 million",
    "The $269 million NMSU-designed 5 MGD desalination system delivered to CRRUA, against a $50 million check and a $250,000 study",
    "About 3,000 permanent jobs written into the lease, against 750 binding and 1,500 advertised",
    "Capture from day one, one permit, continuous monitoring, and a geothermal and delivered-renewables schedule toward the HB93 2045 zero",
  ],
  willNotTitle: "THE FILED PLAN LEAVES YOU WITH:",
  willNotList: [
    "10,144,115 tons of CO₂e a year permitted, more than Albuquerque and Las Cruces combined, with no capture and no use",
    "Each smog pollutant parked just under the 250-ton PSD line in an area that has failed the ozone standard since 2018",
    "750 enforceable jobs and a $12 million-a-year payment for a project valued at up to $165 billion",
    "An undisclosed non-potable water draw from a fresh-aquifer farm right, on top of the 103 million gallons already pumped",
    "About 2,400 MW of usable heat blown into the desert while the county funds a study of a water plant that is already designed",
  ],
  updatesLead: "Construction is 9% complete by the developers' July 28, 2026 report. The permit and the well are stayed. The lease amendments have to be adopted before the fuel cells are delivered; today none of the five conditions is in the lease.",
  scienceIntro: "The engineering behind each condition, with vendor specifications, operating plants and university research, at four reading levels. The Expert level is the one to hand staff.",
  ctaAfter: " to put the five conditions in the lease for ",
  supportLead: "Ask the commission to amend the IRB leases and the Legislature to pass the three bills before the first fuel cell turns on. The conditions cost the developer about 1.5% of the bond.",
};

const homeowner: Copy = {
  heroQuestion: "WHAT DOES THIS MEAN FOR YOUR WATER, YOUR AIR AND YOUR STREET?",
  heroBullets: [
    { strong: "Water added, not taken.", rest: " Their plan takes drinking water from CRRUA and pumps more from a farm well. Ours adds 5 million gallons a day of clean water to the same pipes, enough for about 16,700 homes." },
    { strong: "Smog measured and captured.", rest: " Sunland Park already fails the federal ozone standard. Same fuel cells, but the CO₂ is caught at the stack and every ton of smog gas is measured and posted." },
    { strong: "Food grown next door.", rest: " About 150 acres of greenhouses growing tomatoes, peppers and greens year-round, about 60 million pounds a year, sold locally." },
    { strong: "Jobs you can drive to.", rest: " About 1,500 greenhouse, water and training jobs on top of the 1,500 tech jobs they advertise, with a training institute on site." },
    { strong: "Trucks on their own road.", rest: " Produce trucks use a separate gate on the public road, away from the secure entrance." },
    { strong: "", rest: "Same buildings, same schedule. The difference is whether your neighborhood gets water and food out of it, or smog and a lower water table." },
  ],
  whatIsParagraphs: [
    "A company is building one of the largest data centers in the world just south of Santa Teresa, with its own gas-fired power plant next to it. The county approved $165 billion in bonds for it in 2025. The power plant, by the state's own draft permit, would release about 10 million tons of carbon dioxide a year, more than Albuquerque and Las Cruces put together, and its smog gases are each kept just under the line that would trigger the strict federal review. Sunland Park has failed the federal smog standard since 2018.",
    "Water: the signed agreement lets the campus take up to 20,000 gallons a day of drinking water from CRRUA, and the company bought an old sod farm's water right in the same fresh aquifer your well and your tap draw from. More than 103 million gallons were pumped for construction in five months before a court stopped it. The company has not said how much non-potable water it will use each year.",
    "The upgrade keeps the same buildings and schedule and adds what your neighborhood gets: a plant that turns deep salty water into 5 million gallons a day of drinking water for CRRUA, greenhouses heated by the computers' waste heat, capture of the CO₂ at the stack, and public air monitors. It costs the developer about 1.5% more.",
  ],
  highlightsIntro: "Eight things their website says, and what your neighborhood actually gets under the upgrade. Tap a card for the math in plain words.",
  pitches: [
    { title: "Your tap", body: "CRRUA needs 6 million gallons a day by 2027 and 15 by 2042. The upgrade's plant makes 5 million a day from salty water nobody can drink, so your supply goes up instead of down." },
    { title: "Your lungs", body: "On hot days the plant's exhaust helps make ozone over Sunland Park and Santa Teresa. The upgrade catches the CO₂ and puts monitors on every stack with the readings public, so you can see the air the day it happens." },
    { title: "Your street", body: "Farm trucks use their own gate on the public road. The packing house and the training institute sit between the two public roads, outside the security fence, so the neighborhood gets jobs without traffic through the secure gate." },
  ],
  netlossLead: "Year by year, here is what the plan as filed takes from the aquifer and puts into the air over your neighborhood, and what the upgrade does instead. Every number is from their own filings.",
  willTitle: "YOUR NEIGHBORHOOD GETS:",
  willList: [
    "5 million gallons a day of clean water into CRRUA's pipes, about 16,700 homes' worth, from salty groundwater nobody could drink",
    "The CO₂ caught at the stack and every smog gas measured continuously and posted online",
    "About 60 million pounds a year of local, pesticide-free produce from greenhouses heated by the computers",
    "About 3,000 permanent jobs, with a training institute on site, instead of 750",
    "Farm trucks on their own gate, away from the secure entrance",
  ],
  willNotTitle: "THE FILED PLAN GIVES YOU:",
  willNotList: [
    "About 10 million tons of CO₂ a year into the air, more than Albuquerque and Las Cruces together",
    "Smog gases each kept just under the strict-review line, over a town that already fails the ozone standard",
    "Drinking water taken from CRRUA and an undisclosed amount pumped from the fresh aquifer",
    "103 million gallons already pumped for construction in five months",
    "All the computers' heat blown into the desert by fans, and no food, no water plant, no monitors",
  ],
  updatesLead: "Concrete is being poured now: 9% complete by the developers' own July report. The permit and the well are on hold in court. Nothing about water, air or jobs is written into the county lease yet, and the lease is the only place it can be enforced.",
  scienceIntro: "How the water plant, the capture, the heat and the greenhouses work, explained at four reading levels. Pick 'Adult' for the plain version.",
  ctaAfter: " to get water, clean air and food out of ",
  supportLead: "Ask your county commissioner one question: are the five conditions in the lease yet? Today the answer is no.",
};

const business: Copy = {
  heroQuestion: "WHERE IS THE MONEY IN THE UPGRADE?",
  heroBullets: [
    { strong: "The most sophisticated campus in the country.", rest: " To our knowledge no U.S. hyperscale site yet combines stack capture, heat reuse, water production and a public emissions meter. The first one owns that headline." },
    { strong: "Metrics shareholders can track.", rest: " Tons captured, gas hours avoided, gallons produced, verified jobs and lease revenue per acre: five numbers reported every quarter that turn an ESG promise into an earnings line." },
    { strong: "New revenue on land you already hold.", rest: " About 150 acres of greenhouse leases with heat and CO₂ piped in, a 5 MGD water plant with a utility customer, and heat sold instead of blown away. Lease plus heat alone is estimated at about $130,000 an acre a year." },
    { strong: "Gas to buy less of.", rest: " Geothermal and delivered wind under contract cut gas hours every year, and gas is the plant's largest operating cost." },
    { strong: "", rest: "Added capital is about 1.5% of the $165 billion bond, about $450 million of it grower capital off the developer's balance sheet, and the permit stops being a court risk." },
  ],
  whatIsParagraphs: [
    "Project Jupiter is a $165 billion hyperscale campus in Santa Teresa with a 2,462 MW Bloom fuel-cell microgrid, financed through county industrial revenue bonds that swap property tax for lease payments over 30 years. As filed it is a closed box: one tenant, one product, all power from gas, all heat rejected, no water produced. The air permit and the construction well are stayed in court and the gas pipeline's state-land route has been denied twice, which is schedule risk for everyone on the site.",
    "The upgrade opens side businesses on the same land without touching the halls or the schedule: greenhouse leases with heat and CO₂ as inputs, a water plant with a utility customer, a packing house at the border crossing, and a contracted clean-power share that lowers the fuel bill. Each has a precedent: Gothenburg heats greenhouses on data-center heat, El Paso has run a 27.5 MGD brackish plant since 2007, Google has bought 396 MW of enhanced geothermal for 2028.",
    "What it does for the developer: lower fan and chiller electricity, lease and water revenue, a permit that survives review, and the fee offsets the signed CBA already allows. It also makes this, to our knowledge, the first hyperscale campus in the country to combine stack capture, heat reuse, water production and a public emissions meter, with five quarterly metrics shareholders can audit. The county could put similar certainty on the table for a plan that meets the five conditions. That is a proposal, not a promise.",
  ],
  highlightsIntro: "Eight of their published figures with the revenue and cost behind each answer. Tap a card for the arithmetic.",
  pitches: [
    { title: "If you grow", body: "Glass greenhouses at about $3 million an acre, industry average, on leased land with winter heat at a fraction of gas cost, CO₂ enrichment from the stacks, a packing house and a border crossing next door. About 6.5 jobs an acre including packing." },
    { title: "If you run the campus", body: "You lease 150 acres you are not using, sell heat your fans are already paid to reject, capture exhaust that is 95% CO₂, and contract geothermal and wind that cut your biggest operating cost. It adds about 1.5% and ends the litigation that has your permit frozen." },
    { title: "If you hold the stock", body: "A stayed permit is an unpriced risk on the balance sheet; a capture-first, monitored campus removes it. It also gives the investor-relations team five auditable numbers each quarter: tons of CO₂ captured and sold, gas hours displaced by geothermal and wind, gallons of water delivered, jobs verified against the lease, and greenhouse lease revenue. Those are the metrics that keep an earnings multiple high when the next moratorium bill is filed." },
  ],
  netlossLead: "The as-filed column is what the site produces for anyone but the tenant: nothing. The upgraded column is the new revenue and the new assets, year by year, on cited figures.",
  willTitle: "THE UPGRADE CREATES:",
  willList: [
    "About 150 acres of greenhouse leases with heat and CO₂ supplied, about $130,000 an acre a year in lease and heat revenue (estimate)",
    "A 5 MGD water plant with a utility customer whose demand rises from 6 to 15 MGD by 2042",
    "Summer absorption cooling and winter greenhouse heat from about 2,400 MW that is rejected for free today",
    "A contracted geothermal and wind share that cuts gas purchases every year",
    "A packing house and produce gate at the Santa Teresa port of entry, and a trained workforce from an on-site institute",
  ],
  willNotTitle: "THE FILED PLAN LEAVES ON THE TABLE:",
  willNotList: [
    "About 2,400 MW of heat rejected with no buyer",
    "A 95%-pure CO₂ stream released instead of sold or stored",
    "Unbuilt acres inside a fenced, powered, watered site",
    "A permit and a pipeline stalled in court and at the State Land Office",
    "A $250,000 study of a water plant that NMSU already designed and priced",
  ],
  updatesLead: "Construction 9% complete by the developers' July 28 report; permit and well stayed; pipeline route denied twice. The lease amendments are the moment to add the side businesses, before the fuel cells are delivered.",
  scienceIntro: "The engineering and the precedents behind each revenue line, at four reading levels. The Expert level carries the units, capacity factors and costs.",
  ctaAfter: " to open the side businesses on ",
  supportLead: "Tell the county the upgrade is a business plan, not a protest: leases, water, heat and clean power on the same site, for about 1.5% more, and the most sophisticated data-center campus in the country to show for it.",
};

const kid: Copy = {
  heroQuestion: "WHAT WILL YOUR TOWN BE LIKE WHEN YOU ARE GROWN UP?",
  heroBullets: [
    { strong: "Your air.", rest: " A giant power plant is going up near your house. It breathes out gas every hour. On hot days that helps make smog, and your town already has too much. We want the gas caught in a box instead." },
    { strong: "Your water.", rest: " The plant takes water from your town and from a farm well. We want it to make new clean water from salty water instead, enough for 16,700 homes a day." },
    { strong: "Your food.", rest: " The computers make heat. We want it to grow tomatoes and lettuce next door, all year, instead of being blown into the sky." },
    { strong: "Your job someday.", rest: " The company promised 750 jobs. We want about 3,000, with a school on site that teaches people from here how to do them." },
    { strong: "Your sky.", rest: " Hot rock under the valley and a giant wind farm can make power, so the gas machines can rest more every year." },
    { strong: "", rest: "Same buildings. Your future is the part we want to change." },
  ],
  whatIsParagraphs: [
    "A company is building a giant building full of computers near Sunland Park, and a power plant next to it that burns gas. If nothing changes, this is your town when you are older: the power plant breathes out about 10 million tons of planet-warming gas every year, more than all of Albuquerque and Las Cruces. On hot days some of it turns into smog over your school and your house, and the air here already fails the safe-breathing test. The plant takes drinking water from your town's pipes and pumps more from a farm's well, so there is less for everyone. The computers' heat gets blown into the desert by giant fans, and nothing grows from it.",
    "Nobody here is a bad guy. The company built what the rules let it build, and the county said yes. But you are the one who will breathe this air and drink this water for the next 30 years, and the rules can still change before the plant turns on.",
    "Our plan keeps the same buildings and changes your future: catch the gas in a box and turn it into rock inside concrete, use the heat to grow food, clean the salty water so there is more to drink, burn less gas every year with hot rock and wind, and make about 3,000 jobs instead of 750. It costs only a tiny bit more.",
  ],
  highlightsIntro: "Eight things the company says, and what your town gets instead. Tap a card to see how we know.",
  pitches: [
    { title: "When you are 12", body: "The plant has been running for a few years. As filed: smoggy afternoons, and the water table under your town a little lower. Upgraded: the gas is caught, the greenhouses are growing, and the water plant has already made billions of gallons." },
    { title: "When you are 18", body: "As filed: 750 jobs were promised, the air permit allows the same smog every year, and nothing has been added to the water. Upgraded: about 3,000 jobs, a training school on site, clean water for 16,700 homes every day, and the gas machines resting more each year." },
    { title: "When you are 30", body: "As filed: 30 years of the same. Upgraded: the law says zero gas by 2045, the site has been feeding, watering and hiring your town for a generation, and the concrete around you has the plant's own gas locked inside it." },
  ],
  netlossLead: "Pick how many years from now. Green is your town if the upgrade happens. Red is your town if nothing changes.",
  willTitle: "YOUR TOWN, UPGRADED:",
  willList: ["Clean air you can check on a screen", "More water in the pipes than before", "Tomatoes and lettuce grown next door all year", "About 3,000 jobs and a school that trains you for them", "Gas machines that rest more every year"],
  willNotTitle: "YOUR TOWN, IF NOTHING CHANGES:",
  willNotList: ["10 million tons of gas into the sky every year", "Smog over the houses on hot days", "Less water in the ground each year", "All the heat blown into the desert", "750 jobs"],
  updatesLead: "They have started pouring the concrete. A judge paused their air permit and their water well. None of our ideas is written into the county's deal yet, so there is still time.",
  scienceIntro: "How each idea works, in pictures and a few words.",
  ctaAfter: " to change your future at ",
  supportLead: "Ask a grown-up to sign the petition and to ask the county to put the smart ideas in the deal before the plant turns on.",
};


export const audienceCopy: Record<Audience, Copy> = { overall: overallCopy, legislator, homeowner, business, kid, expert: expertCopy };
