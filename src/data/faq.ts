// Their FAQ questions, quoted exactly from projectjupitertogether.com/faqs (accessed Sept. 2, 2026),
// their answer summarized, and our sourced answer.

export type FaqItem = {
  q: string; // their exact question
  theirs: string; // summary of their answer
  ours: string; // our answer
  sources: string[];
};

export const faq: FaqItem[] = [
  {
    q: "Why did you switch the power supply to Bloom fuel cells?",
    theirs: "Community feedback; fuel cells cut emissions and water use compared with the original gas-turbine design.",
    ours: "Good change, and it is why the upgrade is possible. Fuel cells do not burn with a flame, so their exhaust is about 95% carbon dioxide once dried, which makes capture cheap. The switch cut smog-forming pollutants but left the CO₂: NMED's draft permit still puts it at 10,144,115 tons a year. Keep the fuel cells; add the capture.",
    sources: ["sfnm-fuelcells", "sob", "bloom-chart"],
  },
  {
    q: "Will Project Jupiter have an impact on local air quality or the environmental health of the region?",
    theirs: "Fuel cells cut NOx 92%, particulates 83%, CO 67% and CO₂ 21% versus the prior design.",
    ours: "Yes. Those percentages are against their own earlier turbine plan, not against clean air. The permit still holds each smog pollutant just under 250 tons a year and releases all the CO₂, into Sunland Park, which has been an EPA ozone nonattainment area since 2018, in a county the American Lung Association grades F for ozone. The upgrade adds capture, one Title V permit with PSD-level controls, and continuous public stack monitoring.",
    sources: ["faq", "sob", "sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs"],
  },
  {
    q: "If the microgrid produces emissions, how much is expected and how will they be monitored and reported?",
    theirs: "The NMED air permit will require monitoring and annual reporting.",
    ours: "NMED's draft Statement of Basis: 10,144,115 tons of greenhouse gas a year, criteria pollutants each held under 250 tons, 2,275 stacks, 8,760 hours. Annual self-reporting is the minimum the law allows. The upgrade asks for continuous emissions monitors with the data published live, the same way large power plants report.",
    sources: ["sob", "notice"],
  },
  {
    q: "Will Oracle and Project Jupiter comply with the Energy Transition Act?",
    theirs: "Oracle committed to 100% carbon-free energy matching by 2031, ahead of the ETA's 2045 goal.",
    ours: "'Matching' means buying clean-energy credits somewhere else; it changes nothing at the stacks in Santa Teresa. The CBA itself says HB93 requires this microgrid to run on net-zero carbon resources by 2045. The upgrade's route is physical: 90–95% of stack CO₂ captured from day one, renewable-gas and hydrogen blending that Bloom hardware already accepts, and verified removals for the remainder, with 100% at the stack targeted for 2031.",
    sources: ["bocc", "cba", "bloom-fuels"],
  },
  {
    q: "Will fuel cells eliminate all emissions?",
    theirs: "No. They run on natural gas and emit, though far less criteria pollution than turbines.",
    ours: "Agreed. That is the honest sentence on their site. The upgrade is what you do about the emissions they admit to: capture the CO₂, monitor the rest publicly, and blend cleaner fuel over time.",
    sources: ["faq", "sob"],
  },
  {
    q: "What happens to fuel cells at the end of their life?",
    theirs: "About 99.5% of the materials are recyclable or reusable.",
    ours: "No dispute. The upgrade adds an on-site hardware refurbishment lab and training institute so that recycling and repair work stays in Doña Ana County.",
    sources: ["faq"],
  },
  {
    q: "What happens to the materials used to prepare natural gas for the fuel cell system?",
    theirs: "Sulfur-removal media are replaced periodically and disposed of under environmental rules.",
    ours: "NMED's draft permit describes about 95 desulfurization skids with media replaced roughly every two years and gas venting during changeouts. Fine as far as it goes; the upgrade asks that venting be captured, not released.",
    sources: ["sob"],
  },
  {
    q: "Will the microgrid operate independently or rely on El Paso Electric?",
    theirs: "Behind the meter and independent; grid connection only for offices and emergency backup.",
    ours: "Independence is why ratepayers are protected, and it is also why the state's clean-energy rules for utilities do not reach it. The upgrade keeps the microgrid off the public grid and asks the county to write the clean-air conditions into the lease, the one instrument that does reach it.",
    sources: ["cba", "faq"],
  },
  {
    q: "What is the truth about Project Jupiter's water use?",
    theirs: "About 2.5 million gallons per building one-time, 960,000 for fuel cells, then about 2,400 gallons a day on average over 15 years.",
    ours: "That figure counts only the cooling fills and top-offs. The signed cap for drinking water is 20,000 gallons a day average and 60,000 peak. Non-potable water from the sod-farm right is permanent operating use and its volume has not been disclosed. Construction pumped more than 103 million gallons between April and August 2026. The upgrade adds a 5-million-gallon-a-day desalination plant that NMSU already designed, turning the campus from a user into a producer.",
    sources: ["faq", "cba", "haussamen-water", "cbd-well", "nmsu"],
  },
  {
    q: "Is the water being drawn from an aquifer? Will Project Jupiter affect the quality of clean water supply?",
    theirs: "Water comes from existing rights-holders, so it is not incremental use, and treated well water will not degrade the Mesilla Basin aquifer.",
    ours: "It is aquifer water. The sod-farm right is fresh Mesilla Basin groundwater, in a basin where USGS finds storage falling in most five-year periods since 1985. Moving a farm's right to a data center does not put water back. The upgrade pumps the deep salty water nobody uses and returns clean water to CRRUA's pipes.",
    sources: ["epm-jobs", "sfnm-water", "usgs-mesilla", "nmsu"],
  },
  {
    q: "What types of long-term jobs will Project Jupiter provide to the region and what are the salary ranges expected?",
    theirs: "7,000 construction jobs; 1,500 operations roles; full-time salaries averaging $75–$100K plus benefits.",
    ours: "The signed Community Benefits Agreement requires 750 full-time and 50 part-time jobs within three years of opening, and 2,500 construction jobs. The 1,500 and 7,000 are website projections. The upgrade adds roughly 1,000 greenhouse, packing and logistics jobs per 150 acres, about 250 in water and capture operations, and 250 in refurbishment and training, all on the same site.",
    sources: ["cba", "epm-jobs", "faq"],
  },
  {
    q: "Will local residents be prioritized for jobs at Project Jupiter? Will Project Jupiter establish local training partnerships?",
    theirs: "Yes, with a Doña Ana County First hiring strategy and DACC partnerships.",
    ours: "The CBA commits to the strategy but not to a number of local hires. The upgrade funds a $50 million NMSU and DACC institute with guaranteed placement, against the $4 million the CBA allots to workforce education.",
    sources: ["cba"],
  },
  {
    q: "How many construction workers are onsite currently, and are these union members and New Mexico residents?",
    theirs: "Over 2,700 at the July peak, including nearly 700 New Mexico residents and hundreds of union members.",
    ours: "Their July 28 presentation to the county: 2,755 workers to date, 14% union participation, nearly 700 New Mexico residents. The county has also reported that the developers missed required quarterly job reports.",
    sources: ["bocc", "abq-reports"],
  },
  {
    q: "How much tax revenue is Project Jupiter contributing to the county and the state?",
    theirs: "About $200M county and $400M state during construction; $10M+ county and $30M+ state a year in operations; $12M a year in direct payments.",
    ours: "Those are their projections, footnoted as dependent on the air permit and pipeline being approved. Paid so far: about $10 million in gross receipts tax to the county as of May 2026. The bonds abate property tax for 30 years in exchange for $12 million a year, on a project the developers value at up to $165 billion.",
    sources: ["faq", "bocc", "cba"],
  },
  {
    q: "How much of the investment from Project Jupiter will remain in New Mexico?",
    theirs: "More than $4.7 billion in long-term economic impact to the state and county.",
    ours: "Their own IMPLAN estimate, and we use it as the baseline. The upgrade adds about $1.9 billion on top over 17 years from produce, water sales and land leases, for roughly 1.5% more capital cost. Our figures are estimates and labeled as such.",
    sources: ["econpdf", "bocc"],
  },
];
