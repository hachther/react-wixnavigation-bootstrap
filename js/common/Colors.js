
"use strict";

const NAMED_COLORS = {
  // grayscale (light to dark)
  white: "rgba(255, 255, 255, 1)",
  bianca: "rgba(251, 249, 240, 1)",
  timberwolf: "rgba(218, 216, 210, 1)",
  magnesium: "rgba(178, 178, 178, 1)",
  black: "rgba(3, 3, 3, 1)",

  // blues (light to dark)
  iceberg: "rgba(216, 240, 246, 1)",
  coolGray: "rgba(136, 145, 181, 1)",
  blueBayoux: "rgba(101, 113, 135, 1)",
  facebookBlue: "rgba(66, 103, 178, 1)",
  blue: "rgba(29, 86, 251, 1)",
  palatinateBlue: "rgba(24, 76, 223, 1)",
  persianBlue: "rgba(23, 68, 200, 1)",
  sapphire: "rgba(10, 42, 102, 1)",
  sapphire2: "rgba(18, 36, 108, 1)",
  tangaroa: "rgba(1, 23, 65, 1)",
  blueCharcoal: "rgba(1, 10, 28, 1)",

  // the rest
  yellow: "#FFCC33",
  green: "rgba(106, 246, 162, 1)",
  turquoise: "rgba(0, 205, 223, 1)",
  purple: "rgba(144, 63, 199, 1)",
  pink: "rgba(245, 64, 199, 1)",
  darkPink: "rgba(200, 40, 159, 1)",
  orange: "rgba(247, 144, 77, 1)",
  salmon: "rgba(243, 91, 89, 1)",
  meudocta: "#237C16",
  meudoctaDark: "#004f00",
  meudoctaLight: "#59ac46",
  meudoctaHighlight: '#e8efe8',
  primary: "#237C16",
  google: "#dd4b39",
  message: '#46454C',
  meudoctaArray: [35, 124, 22, 1]
};

const THEME_COLORS = {
  // pass through for use with colorWithAlpha
  ...NAMED_COLORS,

  // alias the named colors by use-case
  actionText: NAMED_COLORS.blue,
  lightBackground: NAMED_COLORS.bianca,
  darkBackground: NAMED_COLORS.blueCharcoal,
  darkText: NAMED_COLORS.blueCharcoal,
  cellBorder: NAMED_COLORS.blueCharcoal,
  lightText: NAMED_COLORS.blueBayoux,

  // legacy
  inactiveText: "#9B9B9B"
};

const LOCATION_COLORS = {
  "220A": NAMED_COLORS.sapphire2,
  "220B": NAMED_COLORS.purple,
  "220C": NAMED_COLORS.blue,
  "210F": NAMED_COLORS.turquoise,
  "210G": NAMED_COLORS.turquoise,
  LL20: NAMED_COLORS.green,
  REGISTRATION: NAMED_COLORS.tangaroa,
  REGISTRATIONDESK: NAMED_COLORS.tangaroa,
  FESTIVALHALL: NAMED_COLORS.sapphire2,
  CITYNATIONALCIVIC: NAMED_COLORS.pink,

  A: NAMED_COLORS.sapphire2,
  B: NAMED_COLORS.purple,
  C: NAMED_COLORS.blue,
  F: NAMED_COLORS.turquoise,
  G: NAMED_COLORS.turquoise,
  LL: NAMED_COLORS.green
};

const AVATAR_COLORS = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
const ESLINT_FIX = null;
const COLOR_DANGER = '#f5455c';
const COLOR_BUTTON_PRIMARY = '#2D6AEA';
const COLOR_TEXT = '#292E35';
const STATUS_COLORS = {
  online: '#2de0a5',
  busy: COLOR_DANGER,
  away: '#ffd21f',
  offline: '#cbced1'
};


module.exports = {
  COLOR_DANGER, COLOR_TEXT,
  ...THEME_COLORS, // pass through all theme colors (named and by-purpose)

  colorWithAlpha(name: string = "blue", opacity: number = 1) {
    if (!THEME_COLORS[name]) {
      name = "blue";
    }
    return THEME_COLORS[name].split(", 1)").join(`, ${opacity})`);
  },

  colorForLocation(location: ?string): string {
    if (!location) {
      return NAMED_COLORS.tangaroa;
    }
    let color = LOCATION_COLORS[location.replace(/ /g, "").toUpperCase()];
    if (!color) {
      color = NAMED_COLORS.tangaroa;
    }
    return color;
  },

  colorForTopic(count: number, index: number): string {
    const hue = Math.round(360 * index / (count + 1));
    return `hsl(${hue}, 74%, 65%)`;
  }
};
