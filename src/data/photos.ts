// Real photographs and diagrams, with the credits their licenses require. Wikimedia Commons (CC / public domain)
// and crops of the developers' own labeled render. Captions say plainly when a photo is a reference, not Santa Teresa.
import { asset } from "@/lib/base";

export type Photo = { src: string; alt: string; caption: string; credit: string; href: string };

const refs = "/images/refs";
const crops = "/images/jupiter/render-crops";
const RENDER_URL = "https://projectjupitertogether.com/wp-content/uploads/2026/08/Project-Jupiter-Site-Render_Labeled-8.27.26-Website.jpg";
const renderCredit = "Crop of Project Jupiter Together's labeled render, Aug. 27, 2026.";

export const photos = {
  fuelCells: { src: asset(`${refs}/bloom-energy-servers.jpg`), alt: "A row of Bloom Energy Server fuel-cell cabinets", caption: "Bloom Energy Server cabinets, the same product family as the 2,275-stack plant in Permit 10883. Reference photo at another site.", credit: "Photo: Bloom Energy, Wikimedia Commons, CC BY 2.0.", href: "https://commons.wikimedia.org/wiki/File:Bloom_Energy_Servers_at_eBay.jpg" },
  well: { src: asset(`${refs}/water-well-benavides-usda.jpg`), alt: "A finished groundwater well head on a ranch near Benavides, Texas", caption: "A groundwater well: the pipe, the pump head and the valve are all there is to see above ground. Brackish water looks like clear water; the salt is dissolved.", credit: "Photo: USDA NRCS / Beverly Moseley, CC BY 2.0.", href: "https://commons.wikimedia.org/wiki/File%3ARancher_Willie_Utley_of_Benavides%2C_Texas_and_Sammy_Guerra%2C_USDA_Natural_Resources_Conservation_Service_district_conservationist_in_Benavides%2C_Tex.%2C_discuss_the_successful_drilling_of_the_water_well_they%E2%80%99re_standing_behind.jpg" },
  dryCoolers: { src: asset(`${crops}/dry.jpg`), alt: "Dry cooler rows in the developers' render", caption: "The long dry-cooler rows in their render. This is where the heat leaves.", credit: renderCredit, href: RENDER_URL },
  halls: { src: asset(`${crops}/halls.jpg`), alt: "The main hall, truck dock and transformer yard in the developers' render", caption: "The main hall and transformer yard in their render. The map above is traced from this.", credit: renderCredit, href: RENDER_URL },
  compressor: { src: asset(`${refs}/co2-compressor-boundary-dam.jpg`), alt: "The CO2 compressor at the Boundary Dam carbon-capture unit", caption: "The CO₂ compressor at Boundary Dam, Saskatchewan, a working capture plant: the exhaust is caught, dried and squeezed before it goes underground.", credit: "Photo: Implicit Matrix, Wikimedia Commons, CC BY 4.0.", href: "https://commons.wikimedia.org/wiki/File:Boundary_Dam_capture_unit_CO2_compressor.jpg" },
  reverseOsmosis: { src: asset(`${refs}/reverse-osmosis-bedok.jpg`), alt: "Reverse-osmosis pressure vessels at the Bedok NEWater factory", caption: "Reverse-osmosis vessels at Singapore's Bedok plant: each tube holds membranes that let water through and hold salt back.", credit: "Photo: Z22, Wikimedia Commons, CC BY-SA 4.0.", href: "https://commons.wikimedia.org/wiki/File:Reverse_osmosis_system_at_Bedok_NEWater_Factory.jpg" },
  alamogordo: { src: asset(`${refs}/bgndrf-alamogordo.jpg`), alt: "The Brackish Groundwater National Desalination Research Facility in Alamogordo, New Mexico", caption: "New Mexico's brackish-water research plant at Alamogordo. The Santa Teresa plant would be a larger version of this.", credit: "Photo: U.S. Bureau of Reclamation, public domain.", href: "https://www.usbr.gov/research/bgndrf/" },
  heatExchanger: { src: asset(`${refs}/plate-heat-exchanger.jpg`), alt: "A dismantled plate heat exchanger showing its stack of metal plates", caption: "A plate heat exchanger opened up: the stack of plates is where the heat crosses.", credit: "Photo: RomanM82, Wikimedia Commons, CC BY-SA 4.0.", href: "https://commons.wikimedia.org/wiki/File:Plate_heat_exchanger_(dismantled).jpg" },
  greenhouse: { src: asset(`${refs}/hydroponic-tomato-greenhouse.jpg`), alt: "Tomato plants growing in a hydroponic greenhouse", caption: "A hydroponic tomato greenhouse: the roots sit in warm, recirculating water, which is what the server heat is for. Reference photo, not Santa Teresa.", credit: "Photo: Giancarlo Dessì, Wikimedia Commons, CC BY-SA 3.0.", href: "https://commons.wikimedia.org/wiki/File:Hydroponic_g11.jpg" },
  geothermal: { src: asset(`${refs}/lightning-dock-geothermal.jpg`), alt: "The Lightning Dock geothermal power plant in Hidalgo County, New Mexico", caption: "Lightning Dock, Hidalgo County: New Mexico's working geothermal plant, about 11 MW net, on the same rift heat this county sits on.", credit: "Photo: Bureau of Land Management, Wikimedia Commons, CC BY 2.0.", href: "https://commons.wikimedia.org/wiki/File:Lightning_Dock_Geothermal_Power_Plant.jpg" },
  wind: { src: asset(`${refs}/el-cabo-wind-nm.jpg`), alt: "Wind turbines at the El Cabo wind farm in Torrance County, New Mexico", caption: "El Cabo wind farm, Torrance County. SunZia, commissioned in 2026, is fourteen times this size; its line runs west to Arizona.", credit: "Photo: Office of Rep. Deb Haaland, public domain.", href: "https://commons.wikimedia.org/wiki/File:Deb_Haaland_visits_El_Cabo_Wind_Farm,_Torrance_County,_New_Mexico_02.jpg" },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/** The photographs under each of the four changes: the thing as filed or the machine, then the fix. */
export const changePhotos: Record<string, PhotoId[]> = {
  carbon: ["fuelCells", "compressor"],
  water: ["reverseOsmosis", "alamogordo"],
  heat: ["heatExchanger", "greenhouse"],
  gas: ["geothermal", "wind"],
};

/** One photograph over each of the three stakes on the home page, in the same order as the tiles. */
export const stakePhotos: PhotoId[] = ["fuelCells", "well", "dryCoolers"];
