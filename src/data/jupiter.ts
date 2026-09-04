// Content extracted verbatim from projectjupitertogether.com

export const nav = [
  { label: "HOME", href: "/" },
  { label: "RESOURCES", href: "#resources" },
  { label: "CAREERS", href: "https://projectjupitertogether.com/jobs/" },
  { label: "VENDOR INTEREST", href: "https://projectjupitertogether.com/vendor-interest/" },
  { label: "MEDIA GALLERY", href: "https://projectjupitertogether.com/media-gallery/" },
];

export const heroBullets = [
  { strong: "$4.7 billion in economic benefits.", rest: "" },
  { strong: "Good jobs.", rest: " Creates 7,000 construction jobs and 1,500 good-paying ongoing jobs." },
  { strong: "Less water.", rest: " Over 15 years Project Jupiter will run on the same amount of water as about 9 households." },
  {
    strong: "Cleaner energy.",
    rest: " Powered by its own independent energy system, Project Jupiter will protect local ratepayers while significantly reducing emissions.",
  },
  { strong: "", rest: "Project Jupiter is the right, responsible data center for New Mexico." },
];

export const whatIsParagraphs = [
  "Project Jupiter is a major investment in Doña Ana County, delivering an innovative data center campus that supports economic growth while preserving New Mexico’s natural resources. The project is expected to contribute more than $4.7 billion in long-term economic impact through tax revenue, investment and additional in commercial activity.* By combining digital infrastructure with on-site power and advanced, water-efficient cooling, the project will operate without straining water utilities or the electric grid. Compared with the original design, the updated energy plan is expected to reduce nitrogen oxide emissions by approximately 92 percent.",
  "The project is already delivering measurable benefits for New Mexico. Today more than 700 New Mexico residents are working onsite to build the campus, and from January through June the project has generated approximately $80 million in state and local tax revenue. Project Jupiter is also on pace to create more than 7,000 construction jobs and deliver 1,500 ongoing project-supported jobs.",
  "Project Jupiter is making significant investments in the community including $50 million for water system improvements, with 80 percent of that commitment already funded. Additional investments include approximately $360 million to support schools, infrastructure, and public services, along with $6.9 million to fund workforce development, the Boys and Girls Club of Las Cruces, clean drinking water, Doña Ana Community College, and habitat restoration.",
];

export const highlights = [
  { icon: "datacenter", num: "$4.7B", label: "IN LONG TERM ECONOMIC IMPACT*" },
  { icon: "water", num: "$50M", label: "WATER SYSTEM IMPROVEMENTS" },
  { icon: "school", num: "$360M", label: "SCHOOLS, INFRASTRUCTURE & PUBLIC SERVICES" },
  { icon: "community", num: "$6.9M", label: "COMMUNITY & WORKFORCE PROGRAMS" },
  { icon: "helmet", num: "8,500+", label: "WELL PAYING CONSTRUCTION & OPERATIONS JOBS" },
  { icon: "emissions", num: "92%", label: "LOWER NOx EMISSIONS WITH BLOOM ENERGY FUEL CELLS" },
  { icon: "energy", num: "100%", label: "CARBON-FREE ENERGY MATCHING BY 2031" },
  { icon: "household", num: "~9", label: "U.S. HOUSEHOLDS ANNUAL NON-POTABLE WATER USE FOR DATA CENTER OPERATIONS" },
] as const;

export const willList = [
  "Deliver more than $4.7 billion in long-term economic impact to the state and county from tax revenue, investments, and additional commercial activity",
  "Provide $360 million in direct support for schools, infrastructure, and local services",
  "Commit $50 million to help repair, upgrade, and improve local water systems",
  "Contribute $6.9 million to fund community projects including workforce development, the Boys and Girls Club of Las Cruces, clean drinking water, Doña Ana Community College, and habitat restoration",
  "Create 7,000 construction jobs and support 1,500 ongoing project-supported jobs, prioritizing local hiring",
  "Pay full-time salaries averaging $75K–$100K plus benefits",
  "Prioritize training, upskilling, and hiring of Doña Ana County residents",
  "Privately fund all infrastructure for the site",
  "Use Bloom Energy fuel cells to fully power the data center campus, reducing NOₓ emissions by approximately 92% compared to gas turbines",
  "Bear all energy costs for Project Jupiter, ensuring the initiative has no impact on residents’ electricity rates or grid stability",
];

export const willNotList = [
  "Increase electricity bills for New Mexico residents or businesses",
  "Use the Camino Real Regional Utility Authority’s (CRRUA) public drinking-water supply for anything other than office water use (kitchens, bathrooms, etc.) at the project site",
  "Use a water-intensive evaporative cooling system at the data center campus (a closed-loop system will be used instead)",
  "Require ongoing water use for data center cooling or power generation during normal operations",
  "Reduce availability or reliability of electricity",
  "Ask the County for funding; no public money will be borrowed or at risk",
  "Expose taxpayers to financial risk",
];

export const progress = [
  { label: "DEVELOPMENT", pct: 100 },
  { label: "CONSTRUCTION", pct: 30 },
  { label: "DELIVERY", pct: 0 },
];

export const updatesLead =
  "As of July 2026, more than 2,700 team members, including nearly 700 New Mexico residents, have worked a total of more than 2 million hours.";

export const vimeoId = "1188168622";

export type TabPanel = { title: string; table?: { head: string[]; rows: string[][] }; paragraphs?: string[]; sources?: string[] };

export const impactTabs: TabPanel[] = [
  {
    title: "$4.7 Billion in Long-Term Economic Impact",
    table: {
      head: ["Economic Impact", "Annual Average", "Duration (Years)", "Total"],
      rows: [
        ["Gross Receipts Tax / Sales Tax During Construction", "—", "3", "$600M"],
        ["Additional Estimated Economic Activity During Construction", "~$384M", "3", "$1.15B"],
        ["Gross Receipts Tax / Sales Tax During Operations (1)(2)", "$40M", "17", "$680M"],
        ["Additional Economic Activity During Operations (1)(2)", "~$113M", "17", "$1.92B"],
        ["Industrial Revenue Bond – Schools, Infrastructure, Services (3)", "$12M", "30", "$360M"],
        ["Workforce Development & Community Programs (4)", "—", "—", "$6.9M"],
      ],
    },
  },
  {
    title: "Thousands of Jobs",
    table: {
      head: ["Job Type", "Projected Employees", "Impact for New Mexico"],
      rows: [
        ["Construction Workers", "7,000\n*2,700 workers so far, as of July 2026", "700 New Mexico residents working as of July 2026"],
        ["Ongoing Project-Supported Roles Once Operational", "1,500", "Local suppliers, vendors, and residents will be prioritized"],
      ],
    },
  },
  {
    title: "Low Water Usage",
    table: {
      head: ["Water Usage", "Gallons", "Potable vs. Non-Potable"],
      rows: [
        ["Data Center Closed-Loop Cooling", "Initial One-Time Fill: 2.5 million gallons for each of the 4 data center buildings\nMaintenance Top-Offs: 0-1,000 gallons annually", "Non-potable"],
        ["Bloom Fuel Cell System", "Initial One-Time Fill: 960,000 gallons\nMaintenance Top-Offs: 167,000 gallons annually", "Non-potable"],
        ["Employee Use (kitchens, bathrooms)", "20,000 gallons per day on average, with a commitment to not exceed 60,000 gallons per day", "Potable"],
      ],
    },
  },
  {
    title: "Cleaner Energy",
    table: {
      head: ["Emissions", "Reduction Compared to Original Project Design"],
      rows: [
        ["Nitrogen Oxides (NOx)", "92%"],
        ["Particulate Air Pollution", "83%"],
        ["Carbon Monoxide (CO)", "67%"],
        ["Carbon Dioxide (CO2)", "21%"],
      ],
    },
  },
];

export const keyComponentTabs: TabPanel[] = [
  {
    title: "Project Jupiter’s Data Centers",
    paragraphs: [
      "Data centers provide the digital infrastructure that supports many of the digital services and technologies people rely on every day. From online learning and healthcare systems to financial transactions, cloud computing, streaming services, communications, and emerging artificial intelligence applications, nearly everything that happens online depends on data centers.",
      "Project Jupiter is an innovative campus that will include four data centers and will bring long-term economic opportunity to Doña Ana County through high-quality jobs, workforce development, and infrastructure investment while supporting sustained economic growth and diversification in the region. The facilities are designed to support growing demand for AI infrastructure using advanced computing technology alongside efficient energy and cooling systems.",
    ],
  },
  {
    title: "Data Center Cooling Design",
    paragraphs: [
      "The data centers will use treated industrial non-potable water for the initial one-time fill of the closed-loop, non-evaporative building cooling system. The cooling liquid circulates within sealed pipes and is continuously reused. As a result, day-to-day operations do not require additional water, and any needed top-offs are rare.",
    ],
  },
  {
    title: "Microgrid",
    paragraphs: [
      "Data centers are the backbone of emergency services, financial institutions, and healthcare systems. They must be available every hour of the day, which means data centers require continuous, reliable power. To meet this demand without impacting local electricity costs or grid stability, Project Jupiter will use on-site power generation supported by Bloom Energy fuel cells. This approach is designed to deliver reliable, around-the-clock power with low emissions.",
      "Bloom Energy fuel cells have served for nearly two decades as a primary source of electricity for hospitals, college campuses, data centers, manufacturing facilities, and other critical industries in the U.S. This updated power design significantly reduces emissions compared to the original plan.",
    ],
  },
  {
    title: "Water Stewardship",
    paragraphs: [
      "Project Jupiter’s water strategy is designed to minimize impact on local resources while maintaining predictable, low usage. The data center and microgrid will not use public drinking water for operations, instead relying on existing, non-potable industrial water sources. Operational water use across the full campus is expected to be driven by typical office needs such as sinks, restrooms, and employee safety needs.",
      "The projected campus water usage is comparable to a typical office building. Designed with regional water constraints in mind, the data center campus will use closed-loop, non-evaporative cooling systems that continuously recirculate cooling liquid within sealed pipes, avoiding the ongoing water demand of traditional evaporative systems.",
    ],
  },
];

export const irbPoints = [
  { label: "KICKSTARTING BIG INVESTMENTS:", text: "IRBs are used by counties to attract large-scale projects like data centers and factories." },
  { label: "FORECASTING PROJECT BUDGET:", text: "Bond request size ($165B) signals how much may be invested over the entire project term." },
  { label: "JOBS AND LOCAL SPENDING:", text: "IRBs lower certain taxes (like property and gross receipts tax) allowing the project to grow, create jobs, and invest locally for the long term." },
  { label: "NO COUNTY RISK:", text: "Doña Ana County does not spend its own money or take on debt, Project Jupiter funds the entire development." },
  { label: "FINANCIAL BENEFIT TO DOÑA ANA COUNTY:", text: "Project Jupiter commits to making $360M in “payments in lieu of taxes” (PILOTs) over a 30-year period to directly support schools, infrastructure, and local services." },
  { label: "HOW IT WORKS:", text: "During the term, Doña Ana County temporarily owns the site and leases it back to Project Jupiter, which enables the tax benefits." },
];

export const resources = [
  { title: "Careers", desc: "Build the Future of Digital Infrastructure", href: "https://projectjupitertogether.com/jobs" },
  { title: "Economic Impact", desc: "Building Opportunity in Doña Ana County", href: "https://projectjupitertogether.com/wp-content/uploads/2026/07/Project-Jupiter-Economic-Impact.pdf" },
  { title: "FAQs", desc: "Answers to Recent Community Questions", href: "https://projectjupitertogether.com/faqs/" },
  { title: "Investing in Doña Ana’s Future", desc: "Reliable, long-term funding", href: "https://projectjupitertogether.com/wp-content/uploads/2026/01/Project-Jupiter-Investing-in-Dona-Anas-Future.pdf" },
  { title: "Minimal Water Usage", desc: "How We Source and Use Water Responsibly", href: "https://www.oracle.com/news/announcement/blog/the-facts-about-project-jupiter-water-usage-2026-06-16/" },
  { title: "Onsite Generation", desc: "How Fuel Cells Work and Why They Matter", href: "https://www.oracle.com/news/announcement/blog/how-fuel-cells-work-2026-04-27/" },
];

export const mediaPress = [
  { title: "Media Gallery", desc: "Approved Project Photos & Videos", href: "https://projectjupitertogether.com/media-gallery/" },
  { title: "Vendor Inquiries", desc: "Vendor partnerships start here.", href: "mailto:vendors@projectjupitertogether.com" },
  { title: "Press Inquiries", desc: "Media contacts and interview requests.", href: "mailto:Press@ProjectJupiterTogether.com" },
];

export const disclaimers = [
  "*Our commitments and projections for tax revenues, jobs, investment and economic impact assume the air permit and pipeline are approved, as originally planned.",
  "(1) Provided by expert 3rd party consultant. (2) The estimates provided in this report are based on the best information available and all reasonable care has been taken in assessing the quality of that information. These estimates are intended to provide a good indication of likely future outcomes and should not be construed to represent a precise measure of those outcomes. To estimate the likely local economic impact attributable to the proposed project, we use a regional economic impact model called IMPLAN.4 – one of the most used economic impact models in the United States. Like all economic impact models, the IMPLAN model uses economic multipliers to quantify economic impacts. (3) IRB period is for 30 years. (4) Based on community benefits agreement.",
];

export const footerText =
  "Website paid for by Oracle and STACK Infrastructure | Copyright © 2026 Project Jupiter Together";
