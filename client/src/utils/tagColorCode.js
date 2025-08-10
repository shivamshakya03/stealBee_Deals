

export const tagColors = {
  electronics: '#c2410c', // deep burnt orange
  fashion: '#9d174d',     // dark pink
  home: '#166534',        // dark green
  sports: '#9a3412',      // deep orange-brown
  beauty: '#6b21a8',      // deep purple
  toys: '#1d4ed8',        // dark blue
  books: '#312e81',       // indigo
  automotive: '#4b2e2b',  // brown
  music: '#155e75',       // dark cyan
  health: '#115e59',      // dark teal
};

export const tagBackgroundColors = {
  electronics: '#ffedd5', // light orange
  fashion: '#fbcfe8',     // light pink
  home: '#dcfce7',        // light green
  sports: '#ffedd5',      // light orange
  beauty: '#f3e8ff',      // light purple
  toys: '#dbeafe',        // light blue
  books: '#e0e7ff',       // light indigo
  automotive: '#ede0d4',  // light brown
  music: '#cffafe',       // light cyan
  health: '#ccfbf1',      // light teal
};

export function getTagColor(tag) {
  return tagColors[tag.toLowerCase()] || '#607D8B'; // default to grey if tag not found
}
export function getTagBackgroundColor(tag) {
  return tagBackgroundColors[tag.toLowerCase()] || '#f0f0f0'; // default to light grey if tag not found
}



export const categoryIcons = {
  trending: "/hot-deal.png",
  fashion: "/hot-deal.png",
  electronics: "/electronics1.png",
  deals: "/hot-deal.png",
  homes: "/homesAppliances.png",
  tech: "/electronics.png",
  top: "/hot-deal.png"
};

