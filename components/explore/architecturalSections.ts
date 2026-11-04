import { MonumentId } from "@/lib/archive/types";

export interface ArchitecturalSection {
  id: string;
  monumentId: MonumentId;
  name: string;
  levelLabel: string;
  depthLabel: string;
  significance: string;
  historicalContext: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  relatedRecordIds: string[];
}

export const ARCHITECTURAL_SECTIONS: Record<MonumentId, ArchitecturalSection[]> = {
  adalaj_stepwell: [
    {
      id: "adl-sec-0",
      monumentId: "adalaj_stepwell",
      name: "Ground Entrance Pavilion & Triple Staircase Convergence",
      levelLabel: "Level 0: Ground Entrance",
      depthLabel: "Surface datum (Y = 0.0m)",
      significance:
        "Unique triple-flight entrance where independent staircases from South, East, and West converge into a single subterranean stepped axis.",
      historicalContext:
        "Documented by James Burgess (1903). Provided sheltered entry for caravans and pilgrims arriving from multiple trade routes.",
      cameraPosition: [0, 6, 21],
      cameraTarget: [0, -1, 9],
      relatedRecordIds: ["ADL-PHO-ENTRANCE", "ADL-SURV-BURGESS-1903"],
    },
    {
      id: "adl-sec-1",
      monumentId: "adalaj_stepwell",
      name: "Entrance Mandapa & Queen Rudabai Sanskrit Epigraph",
      levelLabel: "Level 1: First Tier Mandapa",
      depthLabel: "Depth: -3.3 meters",
      significance:
        "First subterranean pillared gallery platform containing the verified 1498 CE Sanskrit foundation inscription slab recessed in a south-eastern wall niche.",
      historicalContext:
        "The 24-line marble epigraph records Queen Rudabai's patronage, the genealogy of Dandahi Desh, and the cost of 5,00,111 tankas under Sultan Mahmud Begada.",
      cameraPosition: [8, 1, 11],
      cameraTarget: [2, -2.8, 4.5],
      relatedRecordIds: ["ADL-EPI-1498"],
    },
    {
      id: "adl-sec-2",
      monumentId: "adalaj_stepwell",
      name: "Intermediate Colonnaded Hall & Solanki Roll-Bracket Pillars",
      levelLabel: "Level 2: Colonnaded Pavilion",
      depthLabel: "Depth: -6.6 meters",
      significance:
        "Dual avenue of square-to-octagonal Solanki sandstone pillars with pot-shaped kumbha bases and 4-way corbel brackets supporting massive stone lintels.",
      historicalContext:
        "Documented in Bourne & Shepherd's 1874 photographic survey over 150 years ago. Exemplifies classical Gujarati Maru-Gurjara pillar carving.",
      cameraPosition: [10, -3, 6],
      cameraTarget: [0, -5.5, 0],
      relatedRecordIds: ["ADL-PHO-1874", "ADL-PHO-COLONNADE"],
    },
    {
      id: "adl-sec-3",
      monumentId: "adalaj_stepwell",
      name: "Central Octagonal Light-and-Air Shaft",
      levelLabel: "Level 3: Octagonal Light Core",
      depthLabel: "Depth: -9.9 meters",
      significance:
        "Open 8-sided central atrium rising from the subterranean water table through all five storeys, engineered for passive climatic cooling and diffuse natural illumination.",
      historicalContext:
        "Prevents direct solar heat from striking the subterranean water while maintaining a 5°C cooler ambient microclimate in the Gujarat heat.",
      cameraPosition: [6, 4, -4],
      cameraTarget: [0, -8, -5.5],
      relatedRecordIds: ["ADL-PHO-OCTAGON"],
    },
    {
      id: "adl-sec-4",
      monumentId: "adalaj_stepwell",
      name: "Deep Subterranean Gallery",
      levelLabel: "Level 4: Lower Gallery",
      depthLabel: "Depth: -13.2 meters",
      significance:
        "Deep subterranean resting corridor buffered by stepped sandstone retaining walls and corbelled stone buttresses.",
      historicalContext:
        "Used as a cool resting sanctuary by travelers along the historic trade route between Ahmedabad and Patan.",
      cameraPosition: [8, -8, -7],
      cameraTarget: [0, -12, -9],
      relatedRecordIds: ["ADL-PHO-OCTAGON", "ADL-PHO-BASIN"],
    },
    {
      id: "adl-sec-5",
      monumentId: "adalaj_stepwell",
      name: "Perennial Aquifer Basin & Terminal Circular Well",
      levelLabel: "Level 5: Aquifer Basin & Well",
      depthLabel: "Depth: -16.5 meters",
      significance:
        "Lowest reservoir bed reaching the underground aquifer table, adorned with carved niches for Kalpavriksha (tree of life) and Navagraha panels, connected to the deep circular well.",
      historicalContext:
        "The spiritual and hydrological heart of Rudabai ni Vav, providing clean water and symbolic sanctity.",
      cameraPosition: [6, -11, -11],
      cameraTarget: [0, -16, -13],
      relatedRecordIds: ["ADL-PHO-BASIN"],
    },
  ],

  rani_ki_vav: [
    {
      id: "rkv-sec-0",
      monumentId: "rani_ki_vav",
      name: "Eastern Ground Entrance & Stepped Approach",
      levelLabel: "Level 0: Ground Approach",
      depthLabel: "Surface datum (Y = 0.0m)",
      significance:
        "Grand eastern entrance overlooking the 65-meter descending stepped corridor of the UNESCO World Heritage inverted temple.",
      historicalContext:
        "Constructed in the 11th century CE by Queen Udayamati of the Chaulukya dynasty in memory of King Bhima I.",
      cameraPosition: [0, 6, 22],
      cameraTarget: [0, 0, 13],
      relatedRecordIds: ["RKV-PHO-OVERVIEW"],
    },
    {
      id: "rkv-sec-1",
      monumentId: "rani_ki_vav",
      name: "First Subterranean Terrace & Stepped Flight",
      levelLabel: "Level 1: Upper Terrace",
      depthLabel: "Depth: -3.0 meters",
      significance:
        "Upper stepped terrace marking the threshold into the multi-storeyed sacred water monument.",
      historicalContext:
        "Initiates the dramatic visual descent where classical temple architecture is inverted downward into the subterranean earth.",
      cameraPosition: [8, 2, 14],
      cameraTarget: [0, -3, 9],
      relatedRecordIds: ["RKV-PHO-OVERVIEW"],
    },
    {
      id: "rkv-sec-2",
      monumentId: "rani_ki_vav",
      name: "Second Tier Stepped Pavilion",
      levelLabel: "Level 2: Second Tier",
      depthLabel: "Depth: -6.0 meters",
      significance:
        "Stepped pavilion framed by Solanki pillared colonnades and tiered retaining ledges.",
      historicalContext:
        "Each level is structurally engineered to counteract the enormous lateral pressure of the sandy soil of Patan.",
      cameraPosition: [9, -1, 10],
      cameraTarget: [0, -6, 5],
      relatedRecordIds: ["RKV-PHO-OVERVIEW"],
    },
    {
      id: "rkv-sec-3",
      monumentId: "rani_ki_vav",
      name: "Third Tier Pavilion & Sculptural Ledges",
      levelLabel: "Level 3: Third Tier",
      depthLabel: "Depth: -9.0 meters",
      significance:
        "Intermediate colonnaded hall connecting upper galleries to the monumental master pavilion.",
      historicalContext:
        "Features intricate wall friezes depicting celestial nymphs (apsaras) and guardian deities.",
      cameraPosition: [10, -4, 6],
      cameraTarget: [0, -9, 1],
      relatedRecordIds: ["RKV-PHO-LEVEL4"],
    },
    {
      id: "rkv-sec-4",
      monumentId: "rani_ki_vav",
      name: "Level 4: Master Pillared Hall (The Inverted Temple Sanctuary)",
      levelLabel: "Level 4: Master Pavilion",
      depthLabel: "Depth: -12.0 meters",
      significance:
        "The sculptural and architectural pinnacle of Rani ki Vav: a multi-tier pavilion adorned with masterwork friezes of Lord Vishnu and the Dashavatara avatars.",
      historicalContext:
        "Documented in ASI and UNESCO surveys as one of the finest achievements of medieval Indian stone sculpture.",
      cameraPosition: [11, -6, 1],
      cameraTarget: [0, -12, -3.8],
      relatedRecordIds: ["RKV-PHO-LEVEL4"],
    },
    {
      id: "rkv-sec-5",
      monumentId: "rani_ki_vav",
      name: "Lower Tier Pillared Corridor",
      levelLabel: "Level 5: Lower Gallery",
      depthLabel: "Depth: -15.0 meters",
      significance:
        "Lower subterranean hall flanked by structural buttresses and deep sandstone niche panels.",
      historicalContext:
        "Deep within the earth, the temperature drops dramatically while sunlight is channeled along the central stepped corridor.",
      cameraPosition: [9, -9, -4],
      cameraTarget: [0, -15, -8],
      relatedRecordIds: ["RKV-PHO-LEVEL4"],
    },
    {
      id: "rkv-sec-6",
      monumentId: "rani_ki_vav",
      name: "Deep Stepped Shaft Terrace",
      levelLabel: "Level 6: Shaft Terrace",
      depthLabel: "Depth: -18.0 meters",
      significance:
        "Near the lowest depth of the monument, stepping down toward the sacred water reservoir.",
      historicalContext:
        "Features the iconic panel of Sheshashayi Vishnu reclining on the cosmic thousand-headed serpent Shesha.",
      cameraPosition: [8, -12, -8],
      cameraTarget: [0, -18, -12],
      relatedRecordIds: ["RKV-PHO-LEVEL4"],
    },
    {
      id: "rkv-sec-7",
      monumentId: "rani_ki_vav",
      name: "Terminal Cylindrical Well & Sacred Water Table",
      levelLabel: "Level 7: Sacred Well & Reservoir",
      depthLabel: "Depth: -21.0 to -28.0 meters",
      significance:
        "The western terminal masonry well shaft and lowest sacred pool where pilgrims directly accessed the sacred water table.",
      historicalContext:
        "A monumental vertical shaft descending 28 meters below ground level, surrounded by stone rings and water inlet conduits.",
      cameraPosition: [6, -14, -13],
      cameraTarget: [0, -20.5, -15.5],
      relatedRecordIds: ["RKV-PHO-LEVEL4"],
    },
  ],
};

