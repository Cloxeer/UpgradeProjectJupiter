// Central content model for the Sourdough Sophia clone.
// All copy is verbatim from sourdoughsophia.co.uk (front-end demo clone).

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Story", href: "/story" },
  {
    label: "Order",
    href: "/collections/sourdough-bakes",
    children: [
      { label: "Bakery", href: "/collections/sourdough-bakes" },
      { label: "e-book", href: "/collections/books" },
      { label: "e-Gift Voucher", href: "/collections/vouchers" },
      { label: "Book", href: "/collections/books" },
    ],
  },
  {
    label: "Learn",
    href: "/collections/online-courses",
    children: [{ label: "Online courses", href: "/collections/online-courses" }],
  },
  { label: "Invest", href: "/collections/invest" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];

export const footerLinks: NavChild[] = [
  { label: "Order", href: "/collections/sourdough-bakes" },
  { label: "Opening Times & Contact", href: "/contact-us" },
  { label: "Courses", href: "/collections/online-courses" },
  { label: "Invest", href: "/collections/invest" },
  { label: "Allergen Information", href: "/allergens" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy", href: "/privacy" },
  { label: "Returns", href: "/returns" },
];

export const social = {
  facebook: "https://www.facebook.com/sourdoughsophia/",
  instagram: "https://www.instagram.com/sourdoughsophia/",
  email: "hello@sourdoughsophia.co.uk",
  company: 'The Microbakery Ltd (trading as "Sourdough Sophia").',
};

export interface Location {
  name: string;
  address: string;
  hours: string[];
}

export const locations: Location[] = [
  {
    name: "Covent Garden",
    address: "16 Neal's Yard, London WC2H 9DP",
    hours: ["Monday to Sunday: 8am - 6pm"],
  },
  {
    name: "Bermondsey",
    address: "Unit 6 Voyager Business Park, Spa Road, London SE16 4RP",
    hours: ["Friday and Saturdays only: 8am - 3pm"],
  },
  {
    name: "Crouch End",
    address: "4 Topsfield Parade, Tottenham Lane, London N8 8PR",
    hours: ["Monday to Saturday: 8am-4:30pm", "Sunday: 9am-4:30pm"],
  },
  {
    name: "Essex Road",
    address: "117-119 Essex Road, London N1 2SN",
    hours: ["Monday to Saturday: 8am-4:30pm", "Sunday: 8.30am-4:30pm"],
  },
  {
    name: "Highgate West Hill",
    address: "3 Highgate West Hill, London N6 6JS",
    hours: [
      "Monday to Friday: 8am - 3pm",
      "Saturday: 8am - 4.30pm",
      "Sunday: 9am - 4.30pm",
    ],
  },
  {
    name: "Hampstead",
    address: "14 Perrins Court, London NW3 1QS",
    hours: ["Monday to Saturday: 8am - 5.00pm", "Sunday: 9am - 5.00pm"],
  },
  {
    name: "Primrose Hill",
    address: "138 Regents Park Road, London NW1 8XL",
    hours: ["Monday to Saturday: 8am - 4.30pm", "Sunday: 9am - 4.30pm"],
  },
];

export const contactEmails = [
  { label: "General", email: "hello@sourdoughsophia.co.uk" },
  { label: "Marketing", email: "marketing@sourdoughsophia.co.uk" },
  { label: "Wholesale", email: "wholesale@sourdoughsophia.co.uk" },
];

// Allergen matrix ------------------------------------------------------------
export const allergenColumns = [
  "Gluten",
  "Eggs",
  "Peanuts",
  "Soya",
  "Milk",
  "Nuts",
  "Sesame",
  "Fish",
];

// Each row: [productName, ...8 cells] where cell is "Y" | "C" | "".
// An empty product name renders as a spacer row (present on the live table).
export const allergenRows: string[][] = [
  ["N8 loaf", "Y", "", "", "", "", "", "", ""],
  ["N8 tin loaf", "Y", "", "", "", "", "", "", ""],
  ["N8 seeded loaf", "Y", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["Spelt Loaf", "Y", "", "", "", "", "", "", ""],
  ["Rye loaf", "Y", "", "", "", "", "", "", ""],
  ["Baguette", "Y", "", "", "", "", "", "", ""],
  ["Focaccia", "Y", "", "", "", "", "", "", ""],
  ["Plain croissant", "Y", "Y", "", "", "Y", "", "", ""],
  ["Pain aux raisin", "Y", "Y", "", "", "Y", "", "", ""],
  ["Cinnamon cruffin", "Y", "Y", "", "", "Y", "", "", ""],
  ["Babka cruffin", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Pecan maple cruffin", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Pain au chocolat", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Nduja and cheese croissant", "Y", "Y", "", "", "Y", "", "", ""],
  ["Seasonal fruit danish", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Tomato & fontina danish", "Y", "Y", "", "", "Y", "", "", ""],
  ["Squash and balsamic danish", "Y", "Y", "", "", "Y", "", "", ""],
  ["Apple crumble danish", "Y", "Y", "", "", "Y", "", "", ""],
  ["Cardamom Swirl", "Y", "Y", "", "", "Y", "", "", ""],
  ["Sausage roll", "Y", "Y", "", "C", "Y", "", "Y", "C"],
  ["Ham & cheese croissant", "Y", "Y", "", "", "Y", "", "", ""],
  ["Basque cheesecake", "", "Y", "", "", "Y", "", "", ""],
  ["Chocolate brownie (new gluten free)", "", "Y", "", "Y", "Y", "Y", "", ""],
  ["Marble cake", "Y", "Y", "", "", "Y", "", "", ""],
  ["Carrot cake", "Y", "Y", "", "Y", "Y", "Y", "", ""],
  ["Babka cruffin", "Y", "Y", "", "Y", "Y", "Y", "", ""],
  ["Popcorn Cruffin", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Semi-sourdough Challah", "Y", "Y", "", "", "", "", "", ""],
  ["Sourdough Pretzel (Salt)", "Y", "", "", "", "", "", "", ""],
  ["Olive sourdough", "Y", "", "", "", "", "", "", ""],
  ["Chocolate chip cookies", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Almond croissant", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Cereal Milk Cookie", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Panettone", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Mince Pies", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Stollen", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Xmas cookies", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Vegan pumpkin miso pie", "Y", "", "", "Y", "", "", "", ""],
  ["Blood orange bow", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Tiramisu cruffin", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Spinach & feta swirl", "Y", "Y", "", "", "Y", "", "", ""],
  ["Choc chip buns", "Y", "Y", "", "Y", "Y", "", "", ""],
  ["Hot Cross Buns", "Y", "Y", "", "", "Y", "", "", ""],
  ["Sourdough Pretzel (Cheese)", "Y", "", "", "", "Y", "", "", ""],
  ["Egg mayo sandwich", "Y", "Y", "", "", "Y", "", "", ""],
  ["Pastrami sandwich", "Y", "Y", "", "", "Y", "", "", ""],
  ["Banana bread", "Y", "Y", "", "", "Y", "Y", "", ""],
  ["Ham & cheese croissant", "Y", "Y", "", "", "Y", "", "", ""],
  ["Seeded Sourdough Crackers", "Y", "", "", "", "", "", "", ""],
  ["Marmite & cheese cruffin/twist", "Y", "Y", "", "", "Y", "", "", ""],
  ["Salmon bun", "Y", "", "", "", "Y", "", "", "Y"],
  ["Estate Dairy Unsalted Butter", "", "", "", "", "Y", "", "", ""],
  ["Passionfruit bow", "Y", "Y", "", "", "Y", "", "", ""],
  ["Granola", "Y", "", "", "Y", "", "Y", "", ""],
  ["Chilli Jam", "", "", "", "", "", "", "", ""],
  ["Bacon & chilli jam swirl", "Y", "", "", "", "Y", "", "", ""],
  ["Pistachio whipped ganache cruffin", "Y", "", "", "Y", "Y", "Y", "", ""],
];

// Collections (internal shop pages — all currently empty on the live site)
export interface Collection {
  handle: string;
  title: string;
}
export const collections: Collection[] = [
  { handle: "sourdough-bakes", title: "Sourdough Bakes" },
  { handle: "online-courses", title: "Online Courses" },
  { handle: "books", title: "Books" },
  { handle: "live-webinars", title: "Live Webinars" },
  { handle: "vouchers", title: "Vouchers" },
  { handle: "mentoring", title: "Mentoring" },
  { handle: "in-person-workshops", title: "In Person Workshops" },
  { handle: "seasonal-pre-orders", title: "Seasonal Pre-Orders" },
  { handle: "invest", title: "Invest" },
];
