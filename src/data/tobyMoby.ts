// Toby & Moby: little-kid two-voice explainer. Moby asks (q), Toby explains (a).
export type Exchange = { q: string; a: string };

/** Keyed by the part id in src/data/parts.ts (partDocs). */
export const partTM: Record<string, Exchange[]> = {
  // --- Heat ---
  dataHall: [
    {
      q: "Why is the giant shed so hot?",
      a: "It's full of millions of computers all thinking really fast, and thinking fast makes heat, like a laptop on your lap. Water runs through to carry the heat away so the computers don't melt.",
    },
  ],
  heatExchanger: [
    {
      q: "How does the hot water help the plants if it's computer water?",
      a: "It's like a radiator in reverse. The hot computer water runs on one side of a metal wall and warms up clean water on the other side, and the two waters never touch.",
    },
  ],
  dryCoolers: [
    {
      q: "What are those big fans for?",
      a: "They blow the leftover computer heat up into the sky, the same way a car's fan cools the engine. In our plan we use most of the heat first, so the fans do less work.",
    },
  ],
  chillerPlants: [
    {
      q: "What happens on the really hot days?",
      a: "On the hottest days the desert air is too warm to cool the water, so big air conditioners chill it instead. In winter they can rest because the greenhouses take the heat.",
    },
  ],
  greenhouses: [
    {
      q: "What are the glass farms next to the fans?",
      a: "They're greenhouses kept warm all winter by the computer heat, growing tomatoes and lettuce. The bugs can't get in, so there's no bug spray on your food.",
    },
    {
      q: "Do they make jobs too?",
      a: "Yes! Lots of grown-ups get to work there growing the food, so there are jobs right next to home when you're older.",
    },
  ],
  waterPlantHeat: [
    {
      q: "Why warm up the salty water first?",
      a: "Warm salty water squeezes through the cleaning filter easier than cold water. So we use heat we already have to make more clean water to drink.",
    },
  ],

  // --- Carbon ---
  naturalGas: [
    {
      q: "What's the big pipe for?",
      a: "It brings gas to the power machines, like the gas line to a stove but thousands of times bigger. The gas is what they burn to make electricity.",
    },
  ],
  fuelCell: [
    {
      q: "How do the power machines work without fire?",
      a: "They're like a battery that never runs out because you keep feeding it gas. They make electricity without any flame, but the yucky gas still comes out the back.",
    },
  ],
  exhaust: [
    {
      q: "What comes out of the power machines?",
      a: "Mostly fizz-gas, the same stuff that makes soda bubbly, plus some steam. It comes out almost pure, and because it's so pure it's really easy to catch.",
    },
  ],
  dryer: [
    {
      q: "How do you get the water out of the gas?",
      a: "You cool the gassy breath down and the steam turns back into water, like drops on a cold cup. We keep that water and use it.",
    },
  ],
  captureSkid: [
    {
      q: "How do you catch the fizz-gas?",
      a: "A special box grabs the fizz-gas out of the breath and squeezes it into a liquid. Then it can be pumped away instead of floating up into the sky.",
    },
  ],
  released: [
    {
      q: "What about the gas that gets away?",
      a: "Some of it warms up the whole planet. Some turns into smog on hot sunny days and makes it hard to breathe, especially for kids with asthma.",
    },
    {
      q: "Is that why we want to catch it?",
      a: "Yep. If we catch it, the air stays clean for us to breathe when we grow up here.",
    },
  ],
  storage: [
    {
      q: "Where does the squeezed gas go?",
      a: "Deep, deep underground into rock that's like a sponge, way below the water we drink. A solid lid of rock sits on top so the gas stays down there forever.",
    },
  ],
  nearZero: [
    {
      q: "But what about the tiny bit you can't catch?",
      a: "We feed the machines cleaner gas so the little bit left over isn't from fossil fuel. Then we pay to pull the last tiny bit back out of the air.",
    },
  ],

  // --- Water ---
  brackishWell: [
    {
      q: "Where do you get water in the desert?",
      a: "Under the sand there's a giant lake of salty water nobody can drink. We pump that one instead of the good water that people's houses and farms already use.",
    },
  ],
  preheat: [
    {
      q: "Why warm the water before cleaning it?",
      a: "Warm water goes through the filter faster than cold water. So we warm it first with heat we already have from the computers.",
    },
  ],
  filters: [
    {
      q: "What do the filters do?",
      a: "They're a rough strainer that catches the grit and sand first, like rinsing rice before you cook it. That keeps the fancy filter from getting clogged.",
    },
  ],
  reverseOsmosis: [
    {
      q: "How do you take the salt out?",
      a: "You squeeze the salty water hard against a filter so tiny that only the water fits through the little holes. The salt is too big, so it stays behind.",
    },
  ],
  storageTank: [
    {
      q: "Why do you need a big tank?",
      a: "The plant makes clean water steadily all day, but people use lots at once. The tank holds the water until everybody needs it, like a water tower does.",
    },
  ],
  crruaMains: [
    {
      q: "Where does the clean water go?",
      a: "Into the town's pipes, all the way to houses and to the greenhouses. So the computer place gives water to the town instead of taking it.",
    },
  ],
  brineWell: [
    {
      q: "What about the super salty leftover?",
      a: "First we squeeze it again to get even more clean water out, like El Paso is about to do with theirs. What is still left gets pumped way down deep, far below the water we drink, behind a wall of solid rock. That way it can never mix back in with the good water.",
    },
  ],
  closedLoop: [
    {
      q: "Do they use the water over and over?",
      a: "Yes, they fill the pipes once and keep using the same water, like a car's radiator. That's a smart idea, it just isn't the whole water story.",
    },
  ],
  sodFarmWell: [
    {
      q: "Where do they get their water now?",
      a: "They bought an old farm's right to pump the good water and are using it to build. A judge told them to stop because it's the same water the town needs.",
    },
  ],

  // --- Solar ---
  solarRoof: [
    {
      q: "Can we use the sunshine?",
      a: "Yes! Sunshine is free in the desert, so we put panels on every big roof. That power runs the farms and the water machine.",
    },
  ],
  solarAlternatives: [
    {
      q: "Could we put a whole farm on the roof too?",
      a: "Only light things can go on a roof, like flat solar panels. A whole farm is way too heavy, so the greenhouses go on the ground next to the fans instead.",
    },
  ],

  // --- Greenhouse extras ---
  packing: [
    {
      q: "Where do the tomatoes go after they're picked?",
      a: "To a packing house where they get washed, boxed, and put on trucks. It has its own driveway so the food trucks stay away from the computer part.",
    },
  ],
  useCo2: [
    {
      q: "Can we do anything good with the fizz-gas?",
      a: "Yes! You can mix it into wet concrete and it turns into hard rock inside. Once it's rock it can never float up into the air again.",
    },
  ],
  geothermal: [
    {
      q: "How do we make power at night when there's no sun?",
      a: "Deep under this valley the rocks are really hot. You pump water down, it comes back up hot, and hot water can spin a machine to make electricity all night long.",
    },
  ],
  deliveredRenewables: [
    {
      q: "Can the wind help too?",
      a: "New Mexico just built a giant wind farm. Its power can come here on a wire, and when the wind is blowing the gas machines get to rest.",
    },
  ],
  absorptionChiller: [
    {
      q: "How can hot water make things cold?",
      a: "There's a clever machine that turns hot water into cold water. So the computers' heat keeps the tomatoes warm in winter and cool in summer.",
    },
  ],
};

/** Keyed by process kicker string (exactly as below). */
export const processTM: Record<string, Exchange[]> = {
  "Process 1 · Heat": [
    {
      q: "Why are the computers so hot?",
      a: "They think really really fast, and thinking fast makes heat, like when you rub your hands together. There's millions of them, so it's a LOT of heat.",
    },
    {
      q: "So what do we do with all that heat?",
      a: "Instead of throwing it in the sky, we use it to keep greenhouses warm in winter and even make cold water in summer. Nothing gets wasted.",
    },
    {
      q: "Does that help me?",
      a: "Yes. Farms usually burn gas to stay warm on cold nights, and burning gas makes smoke. Using the computers' heat instead means less smoke, so the air is easier on your lungs when you're grown up. And you get fresh tomatoes from next door to look forward to.",
    },
  ],
  "Process 2 · Carbon": [
    {
      q: "Where does the yucky gas go?",
      a: "In their plan it floats up over the town. In our plan a box catches it first, so the air stays clean for when we're grown up.",
    },
    {
      q: "And then where?",
      a: "Some of it feeds the plants and gets turned into rock inside concrete. The rest is pumped deep underground so it stays there for good.",
    },
  ],
  "Process 3 · Water": [
    {
      q: "How do you make water to drink in the desert?",
      a: "There's salty water under the sand nobody can drink. We warm it up, squeeze the salt out through a tiny filter, and clean water comes out for the whole town.",
    },
  ],
  "Process 4 · Retire the gas": [
    {
      q: "How do we stop using the gas?",
      a: "We use sunshine on the roofs, hot rock from deep down, and wind from far away. Little by little the gas machines get to rest more and more each year.",
    },
  ],
  "Process 5 · Food & jobs": [
    {
      q: "What grows here?",
      a: "Tomatoes and lettuce grow all year in warm greenhouses, and trucks take the food to town. And about a whole town's worth of grown-ups get jobs here.",
    },
  ],
};

/** Keyed by zone id. */
export const zoneTM: Record<string, Exchange[]> = {
  future: [
    {
      q: "What's this empty desert part?",
      a: "It's land they haven't built on yet. That's where our greenhouses could go to grow food.",
    },
  ],
  pipeline: [
    {
      q: "What's that long line?",
      a: "It's a big pipe that brings gas all the way to the power plant.",
    },
  ],
  fuel: [
    {
      q: "What's the power plant do?",
      a: "It makes all the electricity for the computers. But it also breathes out yucky gas, which is the part we want to catch.",
    },
  ],
  ops: [
    {
      q: "What are these buildings?",
      a: "Offices, a warehouse, and parking for all the people who work here every day.",
    },
  ],
  halls: [
    {
      q: "What's in the four giant sheds?",
      a: "Millions of computers, all thinking fast. That's why they get so very hot.",
    },
  ],
  power: [
    {
      q: "What are these machines?",
      a: "They cool down the hot water coming from the computers so it can go back around again.",
    },
  ],
  dry: [
    {
      q: "What do the giant fans do?",
      a: "They blow the computers' heat up into the sky. In our plan we grab that heat and use it first before any is thrown away.",
    },
  ],
  capture: [
    {
      q: "What's this new box?",
      a: "It's our box that catches the gas from the power plant before it can float away over the town.",
    },
  ],
  solar: [
    {
      q: "What are the shiny panels?",
      a: "Solar panels on the roofs and in a strip by the fans. They turn free sunshine into power.",
    },
  ],
  institute: [
    {
      q: "What's this building?",
      a: "A packing house where the food gets boxed up, and a school that teaches grown-ups how to do the jobs here.",
    },
  ],
  water: [
    {
      q: "What's this machine?",
      a: "It turns salty water into clean water, enough for a whole town of houses every single day.",
    },
  ],
  greenhouse: [
    {
      q: "What are the glass buildings?",
      a: "Our greenhouses, kept warm by the computers, growing tomatoes and lettuce all year round.",
    },
  ],
  buffer: [
    {
      q: "What's the empty strip around the edge?",
      a: "It's a ring of desert kept open all the way around the outside.",
    },
  ],
};
