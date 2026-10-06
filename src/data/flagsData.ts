/**
 * Vexillological database, quiz questions, and classic match-or-clash rivalries.
 */

export interface FlagSpecimen {
  id: string;
  name: string;
  subtitle: string;
  aspectRatio: string;
  aspectRatioNum: number; // width / height
  classification: string;
  adoptionYear: string;
  colors: {
    name: string;
    hex: string;
    percentage: number;
    symbolism: string;
  }[];
  symbolism: {
    shapesAndEmblems: string;
    historicalSignificance: string;
    adoptionYear: string;
  };
  sheldonGrade: string;
  sheldonsFunFlagFact: string;
  amysCommentary: string;
  sheldonReactionQuote: string;
  vexillologicalRulesCompliance: {
    simpleToDraw: string;
    meaningfulSymbolism: string;
    fewColors: string;
    noLetteringOrSeals: string;
    distinctive: string;
  };
  svgContent: string;
}

export const SAMPLE_FLAGS: FlagSpecimen[] = [
  {
    id: 'nepal',
    name: 'Nepal',
    subtitle: 'The Non-Quadrilateral Marvel',
    aspectRatio: '1:1.25 (Non-Quadrilateral Double-Pennant)',
    aspectRatioNum: 0.82,
    classification: 'Double-Pennant (Step Pennant)',
    adoptionYear: '1962 (Codified in Constitution Schedule 1)',
    colors: [
      { name: 'Crimson Red (Rhododendron)', hex: '#DC143C', percentage: 70, symbolism: 'National flower, courage, and victory in battle.' },
      { name: 'Deep Blue (Azure Border)', hex: '#003893', percentage: 20, symbolism: 'Peace, harmony, and celestial skies.' },
      { name: 'Argent White (Crescent & Sun)', hex: '#FFFFFF', percentage: 10, symbolism: 'The eternal presence of sun and moon over the Himalayas.' },
    ],
    symbolism: {
      shapesAndEmblems: 'Two stacked triangular pennants representing the Himalayan peaks and the two major religions (Hinduism and Buddhism). Features a stylized 8-pointed crescent moon in upper pennant and a 12-pointed sun in the lower.',
      historicalSignificance: 'The only modern sovereign national flag that is mathematically not quadrilateral! Article 5 of the 1990 constitution specifies a 24-step geometric compass-and-straightedge proof to construct it.',
      adoptionYear: '1962',
    },
    sheldonGrade: 'A+ (Extra credit for geometric rigor)',
    sheldonsFunFlagFact:
      'Did you know the geometric construction of the Nepalese flag in Schedule 1 of their constitution is so mathematically exact that Dr. Amy Farrah Fowler had to hold my hand while I wept with joy? It requires an Euclidean ruler and compass theorem with 24 precise steps!',
    amysCommentary:
      'I can confirm Sheldon spent our entire anniversary dinner reciting the 24 mathematical steps to derive the Nepalese flag angles. It was... surprisingly romantic in an obsessive-compulsive sort of way.',
    sheldonReactionQuote: 'Bazinga! Behold the crown jewel of vexillological geometry! Take that, boring rectangles!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Requires a Ph.D. in Euclidean geometry, but is 100% reproducible with compass and straightedge.',
      meaningfulSymbolism: 'Flawless: Himalayan topography meets cosmic astrological symbolism.',
      fewColors: '3 colors precisely (Crimson, Blue, White).',
      noLetteringOrSeals: 'Zero lettering. Pure celestial iconography.',
      distinctive: 'Unmatched. Recognizable from the International Space Station without binoculars.',
    },
    svgContent: `
      <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow">
        <polygon points="0,0 80,45 28,45 92,100 0,100" fill="#003893"/>
        <polygon points="5,5 70,41 23,41 82,95 5,95" fill="#DC143C"/>
        <!-- Moon in upper pennant -->
        <circle cx="28" cy="27" r="9" fill="#FFFFFF"/>
        <circle cx="28" cy="24" r="8" fill="#DC143C"/>
        <!-- Sun in lower pennant -->
        <circle cx="34" cy="68" r="10" fill="#FFFFFF"/>
      </svg>
    `,
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    subtitle: 'The Sovereign Square',
    aspectRatio: '1:1 (True Square)',
    aspectRatioNum: 1.0,
    classification: 'Couped Greek Cross (Square Standard)',
    adoptionYear: '1889',
    colors: [
      { name: 'Pantone 485 C Red', hex: '#FF0000', percentage: 75, symbolism: 'Cantonal neutrality and confederate valor.' },
      { name: 'Argent White', hex: '#FFFFFF', percentage: 25, symbolism: 'Purity, neutrality, and humanitarian assistance.' },
    ],
    symbolism: {
      shapesAndEmblems: 'An equilateral, couped white cross suspended within a square red field. Each arm of the cross is exactly one-sixth longer than it is wide.',
      historicalSignificance: 'One of only two sovereign flags with a 1:1 aspect ratio (the other being Vatican City). The Red Cross emblem is an intentional reversal of this design in honor of Swiss founder Henry Dunant.',
      adoptionYear: '1889',
    },
    sheldonGrade: 'A (Impeccable symmetry)',
    sheldonsFunFlagFact:
      'People think the Swiss flag is just a plus sign, but its arms are mathematically 1/6th longer than wide! During the Olympics, the International Olympic Committee forces Switzerland to fly a 2:3 rectangular version for uniformity, which I consider an international human rights atrocity!',
    amysCommentary:
      'Fun fact: The Swiss cross stimulates the visual cortex bilaterally with high retinal symmetry, which is known to release mild dopamine in primates and, apparently, intense euphoria in Sheldon.',
    sheldonReactionQuote: 'Ah, the Swiss Confederation! A giant plus sign, which also reflects my feelings about precision!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'So simple a toddler could draw it with one red crayon and a ruler.',
      meaningfulSymbolism: 'High. Deeply tied to the Old Swiss Confederacy.',
      fewColors: 'Two colors only. Absolute minimalism.',
      noLetteringOrSeals: 'Zero typography. Pristine.',
      distinctive: '1:1 square ratio distinguishes it instantly from ordinary nautical flags.',
    },
    svgContent: `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow">
        <rect width="100" height="100" fill="#FF0000"/>
        <rect x="40" y="18" width="20" height="64" fill="#FFFFFF"/>
        <rect x="18" y="40" width="64" height="20" fill="#FFFFFF"/>
      </svg>
    `,
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    subtitle: 'The Radiating Rainbow of the Indian Ocean',
    aspectRatio: '1:2',
    aspectRatioNum: 2.0,
    classification: 'Radiating Oblique Tricolor/Pentacolor',
    adoptionYear: '1996',
    colors: [
      { name: 'Blue (Azure)', hex: '#003D88', percentage: 20, symbolism: 'Sky and Indian Ocean that surrounds the archipelago.' },
      { name: 'Yellow (Or)', hex: '#FCD116', percentage: 20, symbolism: 'Sun giving light and life.' },
      { name: 'Red (Gules)', hex: '#D12421', percentage: 20, symbolism: 'People and their determination to work in unity.' },
      { name: 'White (Argent)', hex: '#FFFFFF', percentage: 20, symbolism: 'Social justice and harmony.' },
      { name: 'Green (Vert)', hex: '#007A3D', percentage: 20, symbolism: 'Lush land and natural environment.' },
    ],
    symbolism: {
      shapesAndEmblems: 'Five oblique colored bands radiating from the bottom hoist corner toward the top and fly edges, representing a dynamic new country moving into the future.',
      historicalSignificance: 'Introduced on June 18, 1996, to unite the rival political parties whose party colors were incorporated into a single dynamic burst.',
      adoptionYear: '1996',
    },
    sheldonGrade: 'A- (Dynamic vector projection)',
    sheldonsFunFlagFact:
      'Look at that! The bands radiate from the bottom left corner at angles calculated to partition the top and right edges into three equal segments each! It is vector calculus disguised as national textile.',
    amysCommentary:
      'Looking at the Seychelles flag causes rapid saccadic eye movements. Neurologically, it feels like the visual cortex is being tickled by tropical sunshine.',
    sheldonReactionQuote: 'Bazinga! If optical physics and vexillology had a baby on an island resort, this would be it!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Straight rays from a single vertex point. Highly reproducible.',
      meaningfulSymbolism: 'Every band embodies constitutional unity and national biosphere.',
      fewColors: 'Five colors (slightly above NAVA recommendation of 3, but executed masterfully).',
      noLetteringOrSeals: 'Zero lettering.',
      distinctive: 'One of the most instantly recognizable flags in modern geopolitics.',
    },
    svgContent: `
      <svg viewBox="0 0 200 100" class="w-full h-full drop-shadow">
        <polygon points="0,100 0,0 66.6,0" fill="#003D88"/>
        <polygon points="0,100 66.6,0 133.3,0" fill="#FCD116"/>
        <polygon points="0,100 133.3,0 200,0 200,33.3" fill="#D12421"/>
        <polygon points="0,100 200,33.3 200,66.6" fill="#FFFFFF"/>
        <polygon points="0,100 200,66.6 200,100" fill="#007A3D"/>
      </svg>
    `,
  },
  {
    id: 'maryland',
    name: 'State of Maryland (USA)',
    subtitle: 'The Heraldic Acid Trip',
    aspectRatio: '2:3',
    aspectRatioNum: 1.5,
    classification: 'Quartered Heraldic Banner of Arms',
    adoptionYear: '1904',
    colors: [
      { name: 'Gold & Black (Calvert)', hex: '#EAAA00', percentage: 50, symbolism: 'Arms of the Calvert family (Founders of Maryland).' },
      { name: 'Red & White (Crossland)', hex: '#9E1B32', percentage: 50, symbolism: 'Cross bottony arms of the Crossland family (maternal line).' },
    ],
    symbolism: {
      shapesAndEmblems: 'Quartered field: 1st and 4th quarters feature the black and gold paly with bend dexter of the Calvert family; 2nd and 3rd quarters feature the red and silver cross bottony of the Crossland family.',
      historicalSignificance: 'The only US state flag based directly on English heraldry. During the Civil War, Union supporters flew the Calvert colors while Confederate sympathizers wore the Crossland bottony cross. After the war, the state quartered them together as a symbol of reconciliation.',
      adoptionYear: '1904',
    },
    sheldonGrade: 'B+ (Chaotic neutral, but heraldically legitimate)',
    sheldonsFunFlagFact:
      'While NAVA purists weep because it violates the "simple to draw" guideline, Maryland gets a pass from me because it is a direct 17th-century coat of arms uniting post-Civil War factions. Also, it is the only US state flag mandated by law to be topped with a gold cross bottony finial on the flagpole!',
    amysCommentary:
      'Looking at Maryland’s flag triggers both hemispheres of the brain simultaneously in a mild optical seizure. Yet, Marylanders put it on their socks, crabs, and car bumpers with alarming pride.',
    sheldonReactionQuote: 'It looks like a kaleidoscope collided with medieval armor, yet I cannot look away!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Fails miserably. A child attempting this would end up in tears.',
      meaningfulSymbolism: 'Historic reconciliation of Confederate and Union Maryland families.',
      fewColors: 'Four colors (Black, Gold, Red, White).',
      noLetteringOrSeals: '100% compliant: No boring blue bedsheet state seal!',
      distinctive: 'Voted consistently by NAVA as the most polarizing and memorable US state flag.',
    },
    svgContent: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <!-- Q1 & Q4 Calvert pattern (chevrons/bars) -->
        <rect x="0" y="0" width="75" height="50" fill="#EAAA00"/>
        <rect x="12" y="0" width="12" height="50" fill="#000000"/>
        <rect x="36" y="0" width="12" height="50" fill="#000000"/>
        <rect x="60" y="0" width="12" height="50" fill="#000000"/>
        <polygon points="0,50 75,0 75,10 0,60" fill="#000000" opacity="0.3"/>
        <!-- Q2 & Q3 Crossland cross bottony -->
        <rect x="75" y="0" width="75" height="50" fill="#FFFFFF"/>
        <rect x="105" y="5" width="15" height="40" fill="#9E1B32"/>
        <rect x="85" y="18" width="55" height="14" fill="#9E1B32"/>
        <circle cx="112.5" cy="5" r="4" fill="#9E1B32"/>
        <circle cx="112.5" cy="45" r="4" fill="#9E1B32"/>
        <circle cx="85" cy="25" r="4" fill="#9E1B32"/>
        <circle cx="140" cy="25" r="4" fill="#9E1B32"/>
        <!-- Q3 Crossland -->
        <rect x="0" y="50" width="75" height="50" fill="#FFFFFF"/>
        <rect x="30" y="55" width="15" height="40" fill="#9E1B32"/>
        <rect x="10" y="68" width="55" height="14" fill="#9E1B32"/>
        <!-- Q4 Calvert -->
        <rect x="75" y="50" width="75" height="50" fill="#EAAA00"/>
        <rect x="87" y="50" width="12" height="50" fill="#000000"/>
        <rect x="111" y="50" width="12" height="50" fill="#000000"/>
        <rect x="135" y="50" width="12" height="50" fill="#000000"/>
      </svg>
    `,
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    subtitle: 'The Thunder Dragon Banner',
    aspectRatio: '2:3',
    aspectRatioNum: 1.5,
    classification: 'Diagonally Divided with Central Charge',
    adoptionYear: '1969',
    colors: [
      { name: 'Golden Yellow', hex: '#FFCC00', percentage: 45, symbolism: 'Civil authority and the royal yellow dress of the Druk Gyalpo.' },
      { name: 'Orange', hex: '#FF6600', percentage: 45, symbolism: 'Spiritual power and the monastic tradition of Drukpa Kagyu.' },
      { name: 'White (Argent)', hex: '#FFFFFF', percentage: 10, symbolism: 'Purity of inner thoughts and devotion to the homeland.' },
    ],
    symbolism: {
      shapesAndEmblems: 'Divided diagonally from lower hoist to upper fly. Center features Druk, the legendary Thunder Dragon, holding flaming jewels (norbu) in its claws representing national wealth and cosmic perfection.',
      historicalSignificance: 'Bhutan’s native name is Druk Yul ("Land of the Thunder Dragon"). The snarling dragon symbolizes the protection of guardian deities against external threats.',
      adoptionYear: '1969',
    },
    sheldonGrade: 'A (Imposing mythological charge)',
    sheldonsFunFlagFact:
      'The dragon Druk is holding four wish-fulfilling jewels in its talons. If Leonard ever asks me why I have an emergency flag in our hallway closet, I remind him that Bhutan’s dragon snarling mouth is officially designated to repel intruders, much like my roommate agreement clauses.',
    amysCommentary:
      'In neuroscience, fear responses trigger adrenaline through the amygdala. A snarling white thunder dragon on an orange-yellow background is an effective visual deterrent against invading armies or unwanted dinner guests.',
    sheldonReactionQuote: 'A dragon holding cosmic jewels! Why does the United States only have fifty stars when we could have a giant mythical reptile?',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'The dragon scales require artistic devotion, but the diagonal division is crisp.',
      meaningfulSymbolism: 'Represents the dual spiritual and secular governance of Bhutan.',
      fewColors: 'Three distinct colors.',
      noLetteringOrSeals: 'No lettering whatsoever.',
      distinctive: 'One of the fiercest and most visually striking flags on Earth.',
    },
    svgContent: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <polygon points="0,0 150,0 0,100" fill="#FFCC00"/>
        <polygon points="150,0 150,100 0,100" fill="#FF6600"/>
        <!-- Stylized Dragon silhouette -->
        <path d="M 50,70 Q 75,50 95,35 Q 110,30 115,40 Q 105,55 90,60 Q 70,68 55,75 Z" fill="#FFFFFF"/>
        <circle cx="118" cy="35" r="4" fill="#FFFFFF"/>
        <circle cx="123" cy="38" r="2.5" fill="#000000"/>
        <circle cx="48" cy="74" r="4" fill="#FFFFFF"/>
        <circle cx="95" cy="62" r="4" fill="#FFFFFF"/>
      </svg>
    `,
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    subtitle: 'The Rainbow Nation Pall',
    aspectRatio: '2:3',
    aspectRatioNum: 1.5,
    classification: 'Horizontally Symmetrical Horizontal Pall (Y-Shape)',
    adoptionYear: '1994',
    colors: [
      { name: 'Chilli Red', hex: '#E03C31', percentage: 22, symbolism: 'Bloodshed and sacrifices made for freedom.' },
      { name: 'Cosmos Blue', hex: '#001489', percentage: 22, symbolism: 'Vast skies and oceans.' },
      { name: 'Forest Green', hex: '#007749', percentage: 25, symbolism: 'Land, agriculture, and life.' },
      { name: 'Black (Sable)', hex: '#000000', percentage: 15, symbolism: 'The people and African identity.' },
      { name: 'Gold / Yellow', hex: '#FFB81C', percentage: 8, symbolism: 'Mineral wealth beneath the soil.' },
      { name: 'White (Argent)', hex: '#FFFFFF', percentage: 8, symbolism: 'Peace and reconciliation.' },
    ],
    symbolism: {
      shapesAndEmblems: 'The central green "Y" shape (a pall) begins at the hoist corners and merges into a single horizontal band moving toward the fly, symbolizing the convergence of diverse paths into one nation.',
      historicalSignificance: 'Designed by State Herald Fred Brownell in March 1994, just weeks before the historic first democratic elections ending apartheid. It was so universally beloved that its planned 5-year interim status became permanent.',
      adoptionYear: '1994',
    },
    sheldonGrade: 'A+ (The masterpiece of modern vexillology)',
    sheldonsFunFlagFact:
      'Fred Brownell designed this on a scrap of paper in a Swiss hotel room in 1993! It uses six colors with white and gold fimbriations separating the fields so that heraldic tincture rules (no color on color, no metal on metal) are strictly observed!',
    amysCommentary:
      'The Y-shape mimics converging synaptic pathways in the human nervous system. When diverse impulses synchronize into a single action potential, harmony is achieved.',
    sheldonReactionQuote: 'Bazinga! Fred Brownell understood the Rule of Tincture better than most European monarchs!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Geometrically constructed with parallel 1/5th and 1/3rd bands.',
      meaningfulSymbolism: 'The Y-pall convergence is the benchmark of symbolic reconciliation.',
      fewColors: 'Six colors, yet effortlessly balanced via fimbriation.',
      noLetteringOrSeals: 'Completely seal-free.',
      distinctive: 'Voted one of the top five national flags in world history.',
    },
    svgContent: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect width="150" height="100" fill="#007749"/>
        <polygon points="0,0 75,50 0,100" fill="#000000"/>
        <polygon points="0,0 60,40 60,60 0,100" fill="#000000"/>
        <polyline points="0,5 65,47 65,53 0,95" stroke="#FFB81C" stroke-width="6" fill="none"/>
        <polygon points="0,0 65,45 0,90" fill="#000000"/>
        <!-- Red top & Blue bottom -->
        <polygon points="45,0 150,0 150,33.3 65,33.3" fill="#E03C31"/>
        <polygon points="45,100 150,100 150,66.6 65,66.6" fill="#001489"/>
        <!-- White fimbriation -->
        <line x1="45" y1="33.3" x2="150" y2="33.3" stroke="#FFFFFF" stroke-width="4"/>
        <line x1="45" y1="66.6" x2="150" y2="66.6" stroke="#FFFFFF" stroke-width="4"/>
      </svg>
    `,
  },
  {
    id: 'chad-romania',
    name: 'Chad vs. Romania',
    subtitle: 'The Greatest Vexillological Cold War',
    aspectRatio: '2:3 vs 2:3',
    aspectRatioNum: 1.5,
    classification: 'Identical Vertical Tricolor (Blue-Yellow-Red)',
    adoptionYear: '1959 (Chad) / 1866 (Romania re-adopted 1989)',
    colors: [
      { name: 'Indigo / Cobalt Blue', hex: '#002B7F', percentage: 33.3, symbolism: 'Hope and sky (Chad) / Liberty (Romania).' },
      { name: 'Yellow (Or)', hex: '#FCD116', percentage: 33.3, symbolism: 'Sun and desert (Chad) / Justice (Romania).' },
      { name: 'Red (Gules)', hex: '#CE1126', percentage: 33.3, symbolism: 'Sacrifice and unity (Chad) / Fraternity (Romania).' },
    ],
    symbolism: {
      shapesAndEmblems: 'Vertical tricolor of Blue, Yellow, Red. The only technical difference is the blue stripe: Chad uses Indigo Blue (#00205B), while Romania legally uses Cobalt Blue (#002B7F).',
      historicalSignificance: 'Chad adopted this in 1959. Romania had a communist coat of arms in the center, but after the 1989 revolution, Romanians cut the communist emblem out of the flag, leaving it identical to Chad! In 2004, Chad asked the UN to resolve the dispute, but Romania declared: "The tricolor belongs to us. We will not give up the tricolor."',
      adoptionYear: '1959 & 1989',
    },
    sheldonGrade: 'D- (For diplomatic laziness)',
    sheldonsFunFlagFact:
      'In 2004, the President of Romania literally told the BBC: "The tricolor belongs to us. We will not give up the tricolor." Imagine if Leonard walked into my apartment wearing an identical Flash T-shirt and said, "This red cotton belongs to me." There would be arbitration!',
    amysCommentary:
      'If you show the flag of Chad and the flag of Romania to test subjects in an fMRI machine, their photoreceptors register virtually zero distinguishable neural delta. It is optical plagiarism at the United Nations level.',
    sheldonReactionQuote: 'Two sovereign nations, one blue stripe difference of barely 8 nanometers in wavelength! Scandalous!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Extremely simple.',
      meaningfulSymbolism: 'Generic French-inspired republican tricolor.',
      fewColors: 'Three colors.',
      noLetteringOrSeals: 'No lettering.',
      distinctive: 'Completely un-distinctive from each other! Epic NAVA fail.',
    },
    svgContent: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="50" height="100" fill="#00205B"/>
        <rect x="50" y="0" width="50" height="100" fill="#FCD116"/>
        <rect x="100" y="0" width="50" height="100" fill="#CE1126"/>
      </svg>
    `,
  },
  {
    id: 'brazil',
    name: 'Brazil',
    subtitle: 'The Celestial Sphere of Order & Progress',
    aspectRatio: '7:10',
    aspectRatioNum: 1.428,
    classification: 'Rhombus on Field with Defaced Celestial Sphere',
    adoptionYear: '1889',
    colors: [
      { name: 'Green (Vert)', hex: '#009739', percentage: 65, symbolism: 'The House of Braganza and the Amazonian rainforest.' },
      { name: 'Yellow (Or Rhombus)', hex: '#FEDD00', percentage: 25, symbolism: 'The House of Habsburg and rich mineral reserves.' },
      { name: 'Blue (Celestial Azure)', hex: '#012169', percentage: 10, symbolism: 'The night sky over Rio de Janeiro on November 15, 1889.' },
    ],
    symbolism: {
      shapesAndEmblems: 'Green field with a yellow rhombus (losango) containing a blue celestial globe. The globe is crossed by a white equatorial band reading "ORDEM E PROGRESSO" (Order and Progress) and contains 27 stars corresponding to real constellations.',
      historicalSignificance: 'The stars on the globe depict the precise astronomical sky over Rio de Janeiro on the exact morning of the proclamation of the Republic (8:30 AM, Nov 15, 1889), viewed as if looking from outside the celestial sphere!',
      adoptionYear: '1889',
    },
    sheldonGrade: 'B (High marks for astronomy, penalty for lettering)',
    sheldonsFunFlagFact:
      'NAVA rule #4 says "No lettering or seals". Brazil brazenly violates this with Auguste Comte’s positivist motto "ORDEM E PROGRESSO". However, I forgive them because the 27 stars are not random dots—they represent 9 actual constellations, including the Southern Cross and Scorpius, mapped to the exact sidereal position of Rio de Janeiro!',
    amysCommentary:
      'I like that Sheldon is willing to bend his strict vexillological orthodoxy for astronomical correctness. If only he would bend the Roommate Agreement regarding who controls the thermostat.',
    sheldonReactionQuote: 'Look at that celestial sphere! An entire star chart on a piece of nylon!',
    vexillologicalRulesCompliance: {
      simpleToDraw: 'Drawing 27 stars in precise astronomical coordinates requires an observatory.',
      meaningfulSymbolism: 'Astronomical snapshot of a historical republican sunrise.',
      fewColors: 'Four colors (Green, Yellow, Blue, White).',
      noLetteringOrSeals: 'Contains lettering ("ORDEM E PROGRESSO"), which docks points under NAVA guidelines.',
      distinctive: '100% unique.',
    },
    svgContent: `
      <svg viewBox="0 0 140 100" class="w-full h-full drop-shadow">
        <rect width="140" height="100" fill="#009739"/>
        <polygon points="70,10 128,50 70,90 12,50" fill="#FEDD00"/>
        <circle cx="70" cy="50" r="24" fill="#012169"/>
        <path d="M 47,48 Q 70,38 93,52" stroke="#FFFFFF" stroke-width="4" fill="none"/>
        <!-- Southern cross stars -->
        <circle cx="68" cy="54" r="1.5" fill="#FFFFFF"/>
        <circle cx="72" cy="54" r="1.5" fill="#FFFFFF"/>
        <circle cx="70" cy="51" r="1.5" fill="#FFFFFF"/>
        <circle cx="70" cy="57" r="1.5" fill="#FFFFFF"/>
      </svg>
    `,
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  flagHint?: string;
  options: string[];
  correctIndex: number;
  sheldonCorrectQuote: string;
  sheldonIncorrectQuote: string;
  amyInsight: string;
  funFact: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which of the following is the ONLY sovereign national flag in the world that is NOT a four-sided quadrilateral?',
    options: ['Switzerland', 'Nepal', 'San Marino', 'Vatican City'],
    correctIndex: 1,
    sheldonCorrectQuote: 'Bazinga! Correct! Nepal’s double-pennant has two triangular steps and requires a 24-step Euclidean geometric proof to construct!',
    sheldonIncorrectQuote: 'Incorrect! Oh dear, did you attend the Wolowitz School of Engineering? Switzerland and Vatican City are squares, which have FOUR sides. The answer is Nepal!',
    amyInsight: 'I once watched Sheldon construct Nepal’s flag out of cardstock using a protractor during movie night. We were watching Raiders of the Lost Ark.',
    funFact: 'Article 5 of the Nepalese Constitution outlines the geometric proof using compass and ruler to construct the flag from scratch.',
  },
  {
    id: 2,
    question: 'Chad and Romania have nearly identical blue-yellow-red vertical tricolor flags. What is the only subtle visual difference?',
    options: [
      'Romania’s red stripe is twice as wide as Chad’s',
      'Chad’s blue stripe is a slightly darker indigo shade than Romania’s cobalt',
      'Chad has a small star watermark hidden in the yellow stripe',
      'Romania’s yellow stripe has gold fringes by international maritime treaty',
    ],
    correctIndex: 1,
    sheldonCorrectQuote: 'Spot on! Chad uses Indigo Blue (#00205B) while Romania uses Cobalt Blue (#002B7F). You possess the optical acuity of a Caltech spectroscopist!',
    sheldonIncorrectQuote: 'False! Romania removed its communist crest in 1989, leaving them identical except for the blue wavelength tint! Chad filed a complaint with the UN!',
    amyInsight: 'Amy here: The photoreceptor cone cells in human retinas struggle to distinguish between these two under standard fluorescent lighting.',
    funFact: 'In 2004, the Romanian President refused to alter the flag, stating Romania had used it since 1866 before Chad even existed as an independent nation.',
  },
  {
    id: 3,
    question: 'Which country’s flag is the ONLY national flag in the world to feature a modern assault rifle (an AK-47)?',
    options: ['Angola', 'Mozambique', 'Guatemala', 'Somalia'],
    correctIndex: 1,
    sheldonCorrectQuote: 'Correct! Mozambique! The flag features an AK-47 with a bayonet crossed with a hoe over an open book and star.',
    sheldonIncorrectQuote: 'Wrong! It is Mozambique! Angola features a machete and a cogwheel, but Mozambique proudly flies Mikhail Kalashnikov’s automatic rifle on its cloth!',
    amyInsight: 'The symbolism represents defense and vigilance, alongside education (the book) and agriculture (the hoe).',
    funFact: 'In 2005, a national competition was held to design a new flag without the rifle, but parliament voted to keep the AK-47 design.',
  },
  {
    id: 4,
    question: 'What is the vexillological term for a cross whose arms are oriented diagonally from corner to corner (like St. Andrew’s Cross in Scotland)?',
    options: ['Nordic Cross', 'Fimbriation', 'Saltire', 'Canton'],
    correctIndex: 2,
    sheldonCorrectQuote: 'Splendid! A saltire! Also known as the Crux Decussata or Saint Andrew’s Cross. You are worthy of sitting in my spot on the couch!',
    sheldonIncorrectQuote: 'Inconceivable! It is a Saltire! Nordic crosses have an off-centered vertical arm, while fimbriation is merely the narrow border separating two tinctures!',
    amyInsight: 'Sheldon once lectured a Scottish tourist in Pasadena about the history of the saltire for two hours until the police arrived.',
    funFact: 'The word "saltire" comes from the French word "sautoir", originally referring to a stirrup or stile over a fence.',
  },
  {
    id: 5,
    question: 'At the 1936 Berlin Olympics, which two sovereign countries were shocked to discover their flags were 100% identical, prompting one of them to add a crown the following year?',
    options: ['Monaco and Indonesia', 'Haiti and Liechtenstein', 'Ireland and Côte d’Ivoire', 'Poland and Indonesia'],
    correctIndex: 1,
    sheldonCorrectQuote: 'Bazinga! Exactly! Haiti and Liechtenstein both arrived flying a horizontal blue and red bicolour! Liechtenstein added a prince’s crown in 1937!',
    sheldonIncorrectQuote: 'Incorrect! It was Haiti and Liechtenstein! They had never noticed each other at international events until the opening ceremony parade in 1936!',
    amyInsight: 'Social awkwardness at its geopolitical pinnacle. Even more awkward than Sheldon meeting my mother for the first time.',
    funFact: 'Liechtenstein added a gold ducal crown in the upper hoist canton in 1937 to guarantee it would never be mistaken for Haiti again.',
  },
  {
    id: 6,
    question: 'Which of the following US state flags is the ONLY one with DIFFERENT designs on the obverse (front) and reverse (back)?',
    options: ['Texas', 'Maryland', 'Oregon', 'New Mexico'],
    correctIndex: 2,
    sheldonCorrectQuote: 'Magnificent! Oregon! The front features the state seal and 33 stars, while the back features a golden beaver on a log!',
    sheldonIncorrectQuote: 'False! It is Oregon! The state of Oregon placed a beaver on the reverse side of their flag. Every other US state prints the same design on both sides!',
    amyInsight: 'Castor canadensis, the North American beaver. Renowned for constructing elaborate dams and appearing on the backside of Pacific Northwest textiles.',
    funFact: 'Because it has two different sides, producing an official Oregon state flag costs nearly twice as much as any other state flag.',
  },
  {
    id: 7,
    question: 'What is the "Rule of Tincture" in heraldry and vexillology, which Sheldon passionately enforces?',
    options: [
      'A flag must never feature more than two animal charges',
      'Metals (Or/Yellow & Argent/White) must never be placed on metals, and colors must never be placed on colors',
      'The canton must always face the prevailing wind direction',
      'Red must always represent bloodshed in military conflict',
    ],
    correctIndex: 1,
    sheldonCorrectQuote: 'Bravo! You understand heraldic contrast! "Color shall not be upon color, nor metal upon metal!" This prevents visual mud when viewed from afar.',
    sheldonIncorrectQuote: 'Dismal! It is the rule of contrast: Metals (Gold/Silver/Yellow/White) must not touch metals, and Colors (Red, Blue, Green, Black, Purple) must not touch colors!',
    amyInsight: 'The rule dates back to medieval tournaments so knights could instantly identify friend from foe through dust and visor slits.',
    funFact: 'The flag of Vatican City intentionally breaks this rule with yellow and white side-by-side to symbolize the unique divine authority of the Holy See.',
  },
  {
    id: 8,
    question: 'Which national flag features the constellation of the Southern Cross with FIVE white stars, compared to Australia’s SIX stars?',
    options: ['New Zealand', 'Samoa', 'Papua New Guinea', 'Tuvalu'],
    correctIndex: 1,
    sheldonCorrectQuote: 'Close attention to detail! Samoa has five white stars, while New Zealand has four red stars, and Australia has five white stars plus the large Commonwealth Star!',
    sheldonIncorrectQuote: 'Incorrect! Australia has 6 stars (including the 7-pointed Commonwealth star). New Zealand has 4 red stars with white borders. Samoa has 5 white stars!',
    amyInsight: 'Crux, the Southern Cross, is the smallest yet one of the most distinctive constellations in the southern hemisphere.',
    funFact: 'New Zealand adopted its Southern Cross flag in 1902, two years before Australia, which fuels an eternal Kiwi-Aussie vexillological debate.',
  },
];

export interface FlagRivalry {
  id: string;
  title: string;
  flag1: string;
  flag2: string;
  similarityScore: number;
  sheldonTake: string;
  amyTake: string;
  verdict: string;
}

export const FAMOUS_RIVALRIES: FlagRivalry[] = [
  {
    id: 'chad-romania',
    title: 'Chad vs. Romania',
    flag1: 'Chad',
    flag2: 'Romania',
    similarityScore: 98,
    sheldonTake:
      'This is the granddaddy of vexillological identity theft. Chad adopted their tricolor in 1959. Romania had a communist coat of arms in the middle, but when they overthrew Nicolae Ceaușescu in 1989, they cut the hole out and left it identical to Chad! When Chad protested to the UN in 2004, Romania shrugged and said they had the colors first in 1866.',
    amyTake:
      'If you place both flags in an ophthalmology clinic, patients will assume the optometrist is testing them for astigmatism.',
    verdict: 'Winner: Chad, because they filed their UN complaint with legitimate diplomatic outrage.',
  },
  {
    id: 'monaco-indonesia',
    title: 'Monaco vs. Indonesia',
    flag1: 'Monaco',
    flag2: 'Indonesia',
    similarityScore: 95,
    sheldonTake:
      'Both flags are horizontal bicolours of red over white. The difference? Monaco’s legal ratio is 4:5, while Indonesia’s is 2:3! When Indonesia declared independence in 1945, Monaco formally protested. Indonesia countered that their colors trace back to the 13th-century Majapahit empire. Monaco backed down because you cannot argue with 13th-century Javanese royal heraldry.',
    amyTake:
      'It is like buying the same dress as your coworker, but hers is petite and yours is standard fit.',
    verdict: 'Winner: Indonesia, for backing up their flag with 700 years of Majapahit history.',
  },
  {
    id: 'australia-newzealand',
    title: 'Australia vs. New Zealand',
    flag1: 'Australia',
    flag2: 'New Zealand',
    similarityScore: 89,
    sheldonTake:
      'Both feature the British Union Jack in the canton on a defaced Blue Ensign with the Southern Cross constellation. But observe the details! New Zealand has four red stars with white borders. Australia has five white stars plus the massive 7-pointed Commonwealth Star beneath the canton! New Zealand adopted theirs in 1902, Australia in 1901 (approved in 1903). New Zealand Prime Ministers constantly complain that Australia copied them.',
    amyTake:
      'Australia essentially looked at New Zealand’s test paper and added one extra star and changed the ink color.',
    verdict: 'Winner: New Zealand, for adopting it into law first and having cleaner 5-pointed red stars.',
  },
  {
    id: 'ireland-cote-divoire',
    title: 'Ireland vs. Côte d’Ivoire',
    flag1: 'Ireland',
    flag2: 'Côte d’Ivoire',
    similarityScore: 92,
    sheldonTake:
      'Ireland is Green-White-Orange (hoist to fly). Côte d’Ivoire is Orange-White-Green! If an incompetent flag-bearer turns the flagpole 180 degrees or flies the flag backwards on a windless day, you have committed an international act of diplomatic transposition! In 2018, when Irish boxer Carl Frampton won a fight, his venue mistakenly projected the Ivorian flag!',
    amyTake:
      'Mirror symmetry is a fascinating neurological phenomenon. Unfortunately, international boxing rings are not known for rigorous cognitive processing.',
    verdict: 'Winner: Ireland, because St. Patrick’s Day merchandise depends on it.',
  },
  {
    id: 'haiti-liechtenstein',
    title: 'Haiti vs. Liechtenstein',
    flag1: 'Haiti',
    flag2: 'Liechtenstein',
    similarityScore: 94,
    sheldonTake:
      'The 1936 Berlin Olympics catastrophe! Both nations arrived flying an identical horizontal bicolour of blue over red. Neither country had realized because they had never competed together. The very next year, in 1937, Liechtenstein added a gold princely coronet to their canton so they would never be mistaken for a Caribbean republic again!',
    amyTake:
      'A masterclass in geopolitical embarrassment. Adding a gold crown is the vexillological equivalent of wearing a name tag at a party where someone wore your exact outfit.',
    verdict: 'Winner: Liechtenstein, for solving the dilemma with royal headwear.',
  },
];

export const APARTMENT_4A_RULES = [
  'Section 12-A: The official Apartment 4A Flag is a golden lion rampant on a field of azure. It must never touch the carpet.',
  'Section 12-B: The flag shall be flown upside down ONLY in case of supreme household emergency—specifically, when Leonard forgets to buy 1% milk or when the WiFi latency exceeds 12 milliseconds.',
  'Section 12-C: Under no circumstances may Wil Wheaton, Leslie Winkle, or Barry Kripke display a vexillological standard within 50 feet of Sheldon’s spot.',
  'Section 12-D: When guests enter Apartment 4A, they must render a polite vexillological nod to the Pasadena municipal banner.',
];

export const VEXILLOLOGY_TERMS = [
  { term: 'Canton', definition: 'Any quarter of a flag, but usually the upper hoist quarter (e.g. the 50 stars on the US flag or the Union Jack on Australia’s flag).' },
  { term: 'Saltire', definition: 'A diagonal cross shaped like an "X" dividing the field into four compartments (e.g. Scotland, Jamaica, Alabama).' },
  { term: 'Fimbriation', definition: 'A narrow border or stripe of contrasting color/metal used to separate two colors that would otherwise clash or violate heraldic rules.' },
  { term: 'Pall', definition: 'A Y-shaped charge or division of the field, famously seen on South Africa and Vanuatu.' },
  { term: 'Defacement', definition: 'The addition of any emblem, coat of arms, or charge to a plain flag or ensign.' },
  { term: 'Vexilloid', definition: 'A flag-like object used similarly to a flag but differing in some way, such as Roman legionary eagles or medieval standards.' },
  { term: 'Tricolor', definition: 'A flag divided into three equal stripes, either horizontally (e.g. Germany) or vertically (e.g. France, Italy).' },
];
