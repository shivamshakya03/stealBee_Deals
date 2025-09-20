

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

export const MobileHeaderCategoryIcons = {
  stealdeals: "/CategoriesIcon/TopDeals.svg", 
  top5: "/CategoriesIcon/Top5.svg", 
  electronics: "/CategoriesIcon/Electronics.svg",
  fashion: "/CategoriesIcon/Fashion.svg",
  appliances: "/CategoriesIcon/Home.svg",   
  gifts: "/CategoriesIcon/giftscategory.png",   
  fitness: "/CategoriesIcon/Fitness.svg", 
  sports: "/CategoriesIcon/Sports.svg",
  beauty: "/CategoriesIcon/beautycategory.webp",    //
  toys: "/CategoriesIcon/Toys.svg",   
  books: "/CategoriesIcon/Books.svg",
  automotive: "/CategoriesIcon/Automotive.svg",
  music: "/CategoriesIcon/music.svg", 
  amazon: "/CategoriesIcon/TopDeals.svg",
  flipkart: "/CategoriesIcon/TopDeals.svg",
  meesho: "/CategoriesIcon/TopDeals.svg", 
};
export const storeLogo = {
  amazon: "https://cdn.worldvectorlogo.com/logos/logo-amazon.svg",
  flipkart: "https://cdn.worldvectorlogo.com/logos/flipkart.svg ",
  ajio: "https://cdn.worldvectorlogo.com/logos/ajio.svg",
  meesho: "/Meesho_logo.png",
  myntra: "https://cdn.worldvectorlogo.com/logos/myntra-1.svg",
    
};


   
  