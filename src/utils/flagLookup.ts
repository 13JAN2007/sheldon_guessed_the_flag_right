/**
 * Comprehensive Country Flag Lookup & Renderer
 * Provides high-fidelity SVGs and FlagCDN fallbacks for all countries and rivalries.
 */

export interface FlagGraphicInfo {
  name: string;
  code?: string;
  svgHtml?: string;
  imageUrl?: string;
  aspectRatio: string;
}

// Clean built-in SVG graphics for key countries and rivalries
const BUILTIN_SVGS: Record<string, { svgHtml: string; aspectRatio: string }> = {
  chad: {
    aspectRatio: '2:3',
    svgHtml: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="50" height="100" fill="#00205B"/>
        <rect x="50" y="0" width="50" height="100" fill="#FCD116"/>
        <rect x="100" y="0" width="50" height="100" fill="#CE1126"/>
      </svg>
    `,
  },
  romania: {
    aspectRatio: '2:3',
    svgHtml: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="50" height="100" fill="#002B7F"/>
        <rect x="50" y="0" width="50" height="100" fill="#FCD116"/>
        <rect x="100" y="0" width="50" height="100" fill="#CE1126"/>
      </svg>
    `,
  },
  monaco: {
    aspectRatio: '4:5',
    svgHtml: `
      <svg viewBox="0 0 125 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="125" height="50" fill="#CE1126"/>
        <rect x="0" y="50" width="125" height="50" fill="#FFFFFF"/>
      </svg>
    `,
  },
  indonesia: {
    aspectRatio: '2:3',
    svgHtml: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="150" height="50" fill="#FF0000"/>
        <rect x="0" y="50" width="150" height="50" fill="#FFFFFF"/>
      </svg>
    `,
  },
  australia: {
    aspectRatio: '1:2',
    svgHtml: `
      <svg viewBox="0 0 200 100" class="w-full h-full drop-shadow">
        <rect width="200" height="100" fill="#00008B"/>
        <!-- Union Jack in Canton -->
        <rect width="100" height="50" fill="#00247D"/>
        <polygon points="0,0 100,50 100,40 0,0" fill="#FFFFFF"/>
        <polygon points="100,0 0,50 0,40 100,0" fill="#FFFFFF"/>
        <polygon points="0,0 100,50 100,45 0,0" fill="#CF142B"/>
        <polygon points="100,0 0,50 0,45 100,0" fill="#CF142B"/>
        <rect x="42" y="0" width="16" height="50" fill="#FFFFFF"/>
        <rect x="0" y="17" width="100" height="16" fill="#FFFFFF"/>
        <rect x="45" y="0" width="10" height="50" fill="#CF142B"/>
        <rect x="0" y="20" width="100" height="10" fill="#CF142B"/>
        <!-- Commonwealth 7-pointed star -->
        <circle cx="50" cy="75" r="14" fill="#FFFFFF"/>
        <!-- Southern Cross (White stars) -->
        <circle cx="150" cy="22" r="5" fill="#FFFFFF"/>
        <circle cx="170" cy="46" r="5" fill="#FFFFFF"/>
        <circle cx="150" cy="78" r="5" fill="#FFFFFF"/>
        <circle cx="130" cy="54" r="5" fill="#FFFFFF"/>
        <circle cx="160" cy="62" r="3.5" fill="#FFFFFF"/>
      </svg>
    `,
  },
  'new zealand': {
    aspectRatio: '1:2',
    svgHtml: `
      <svg viewBox="0 0 200 100" class="w-full h-full drop-shadow">
        <rect width="200" height="100" fill="#00247D"/>
        <!-- Union Jack in Canton -->
        <rect width="100" height="50" fill="#00247D"/>
        <polygon points="0,0 100,50 100,40 0,0" fill="#FFFFFF"/>
        <polygon points="100,0 0,50 0,40 100,0" fill="#FFFFFF"/>
        <polygon points="0,0 100,50 100,45 0,0" fill="#CC142B"/>
        <polygon points="100,0 0,50 0,45 100,0" fill="#CC142B"/>
        <rect x="42" y="0" width="16" height="50" fill="#FFFFFF"/>
        <rect x="0" y="17" width="100" height="16" fill="#FFFFFF"/>
        <rect x="45" y="0" width="10" height="50" fill="#CC142B"/>
        <rect x="0" y="20" width="100" height="10" fill="#CC142B"/>
        <!-- Southern Cross (Red stars with white border, NO Commonwealth star) -->
        <circle cx="150" cy="22" r="6" fill="#FFFFFF"/>
        <circle cx="150" cy="22" r="4" fill="#CC142B"/>
        <circle cx="172" cy="46" r="5" fill="#FFFFFF"/>
        <circle cx="172" cy="46" r="3.5" fill="#CC142B"/>
        <circle cx="150" cy="78" r="6.5" fill="#FFFFFF"/>
        <circle cx="150" cy="78" r="4.5" fill="#CC142B"/>
        <circle cx="130" cy="52" r="5" fill="#FFFFFF"/>
        <circle cx="130" cy="52" r="3.5" fill="#CC142B"/>
      </svg>
    `,
  },
  ireland: {
    aspectRatio: '1:2',
    svgHtml: `
      <svg viewBox="0 0 200 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="66.6" height="100" fill="#169B62"/>
        <rect x="66.6" y="0" width="66.6" height="100" fill="#FFFFFF"/>
        <rect x="133.2" y="0" width="66.8" height="100" fill="#FF883E"/>
      </svg>
    `,
  },
  "côte d'ivoire": {
    aspectRatio: '2:3',
    svgHtml: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="50" height="100" fill="#F77F00"/>
        <rect x="50" y="0" width="50" height="100" fill="#FFFFFF"/>
        <rect x="100" y="0" width="50" height="100" fill="#009E60"/>
      </svg>
    `,
  },
  'cote d\'ivoire': {
    aspectRatio: '2:3',
    svgHtml: `
      <svg viewBox="0 0 150 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="50" height="100" fill="#F77F00"/>
        <rect x="50" y="0" width="50" height="100" fill="#FFFFFF"/>
        <rect x="100" y="0" width="50" height="100" fill="#009E60"/>
      </svg>
    `,
  },
  haiti: {
    aspectRatio: '3:5',
    svgHtml: `
      <svg viewBox="0 0 166 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="166" height="50" fill="#00209F"/>
        <rect x="0" y="50" width="166" height="50" fill="#D21034"/>
        <!-- Central white square with coat of arms -->
        <rect x="68" y="35" width="30" height="30" fill="#FFFFFF"/>
        <circle cx="83" cy="50" r="9" fill="#007749"/>
      </svg>
    `,
  },
  liechtenstein: {
    aspectRatio: '3:5',
    svgHtml: `
      <svg viewBox="0 0 166 100" class="w-full h-full drop-shadow">
        <rect x="0" y="0" width="166" height="50" fill="#002B7F"/>
        <rect x="0" y="50" width="166" height="50" fill="#CE1126"/>
        <!-- Gold prince's coronet in upper hoist canton -->
        <path d="M 20,18 L 40,18 L 36,32 L 24,32 Z" fill="#FFD700"/>
        <circle cx="20" cy="18" r="2.5" fill="#FFD700"/>
        <circle cx="30" cy="15" r="3" fill="#FFD700"/>
        <circle cx="40" cy="18" r="2.5" fill="#FFD700"/>
      </svg>
    `,
  },
  nepal: {
    aspectRatio: '1:1.25',
    svgHtml: `
      <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow">
        <polygon points="0,0 80,45 28,45 92,100 0,100" fill="#003893"/>
        <polygon points="5,5 70,41 23,41 82,95 5,95" fill="#DC143C"/>
        <circle cx="28" cy="27" r="9" fill="#FFFFFF"/>
        <circle cx="28" cy="24" r="8" fill="#DC143C"/>
        <circle cx="34" cy="68" r="10" fill="#FFFFFF"/>
      </svg>
    `,
  },
  switzerland: {
    aspectRatio: '1:1',
    svgHtml: `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow">
        <rect width="100" height="100" fill="#FF0000"/>
        <rect x="40" y="18" width="20" height="64" fill="#FFFFFF"/>
        <rect x="18" y="40" width="64" height="20" fill="#FFFFFF"/>
      </svg>
    `,
  },
};

// Common country names to ISO 3166-1 alpha-2 code mapping
const COUNTRY_CODES: Record<string, string> = {
  chad: 'td',
  romania: 'ro',
  monaco: 'mc',
  indonesia: 'id',
  australia: 'au',
  'new zealand': 'nz',
  ireland: 'ie',
  "côte d'ivoire": 'ci',
  "cote d'ivoire": 'ci',
  'ivory coast': 'ci',
  haiti: 'ht',
  liechtenstein: 'li',
  nepal: 'np',
  switzerland: 'ch',
  france: 'fr',
  germany: 'de',
  italy: 'it',
  spain: 'es',
  japan: 'jp',
  brazil: 'br',
  'united states': 'us',
  usa: 'us',
  us: 'us',
  'united kingdom': 'gb',
  uk: 'gb',
  'great britain': 'gb',
  canada: 'ca',
  india: 'in',
  china: 'cn',
  russia: 'ru',
  mexico: 'mx',
  argentina: 'ar',
  colombia: 'co',
  'south africa': 'za',
  egypt: 'eg',
  nigeria: 'ng',
  kenya: 'ke',
  netherlands: 'nl',
  holland: 'nl',
  belgium: 'be',
  poland: 'pl',
  austria: 'at',
  sweden: 'se',
  norway: 'no',
  denmark: 'dk',
  finland: 'fi',
  iceland: 'is',
  greece: 'gr',
  turkey: 'tr',
  portugal: 'pt',
  ukraine: 'ua',
  vietnam: 'vn',
  thailand: 'th',
  philippines: 'ph',
  singapore: 'sg',
  malaysia: 'my',
  'south korea': 'kr',
  korea: 'kr',
  jamaica: 'jm',
  cuba: 'cu',
  chile: 'cl',
  peru: 'pe',
  venezuela: 've',
  uruguay: 'uy',
  vatican: 'va',
  'vatican city': 'va',
  'san marino': 'sm',
  luxembourg: 'lu',
  morocco: 'ma',
  tunisia: 'tn',
  ghana: 'gh',
  mozambique: 'mz',
  angola: 'ao',
  samoa: 'ws',
  bhutan: 'bt',
  seychelles: 'sc',
  fiji: 'fj',
  algeria: 'dz',
  pakistan: 'pk',
  bangladesh: 'bd',
  iran: 'ir',
  iraq: 'iq',
  israel: 'il',
  saudi: 'sa',
  'saudi arabia': 'sa',
};

/**
 * Normalizes input name and returns flag graphics information.
 */
export function getFlagGraphic(name: string): FlagGraphicInfo {
  if (!name) {
    return { name: 'Unknown', aspectRatio: '2:3' };
  }

  const clean = name.trim().toLowerCase();

  // 1. Direct built-in match
  if (BUILTIN_SVGS[clean]) {
    return {
      name,
      svgHtml: BUILTIN_SVGS[clean].svgHtml,
      aspectRatio: BUILTIN_SVGS[clean].aspectRatio,
    };
  }

  // 2. Fuzzy match within built-in keys
  const builtinKey = Object.keys(BUILTIN_SVGS).find((k) => clean.includes(k) || k.includes(clean));
  if (builtinKey) {
    return {
      name,
      svgHtml: BUILTIN_SVGS[builtinKey].svgHtml,
      aspectRatio: BUILTIN_SVGS[builtinKey].aspectRatio,
    };
  }

  // 3. Country code match
  const code = COUNTRY_CODES[clean] || Object.entries(COUNTRY_CODES).find(([k]) => clean.includes(k) || k.includes(clean))?.[1];

  if (code) {
    return {
      name,
      code,
      imageUrl: `https://flagcdn.com/w640/${code.toLowerCase()}.png`,
      aspectRatio: '2:3',
    };
  }

  // 4. Fallback generic
  return {
    name,
    aspectRatio: '2:3',
  };
}
