import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoryNav.module.css";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import { MobileHeaderCategoryIcons } from "../../utils/tagColorCode.js";
import ProductSort from "../ProductSort/ProductSort.jsx";

const categories = [
  "steal Deals",
  "top 5",
  "electronics",
  "fashion",
  "Appliances",
  "gifts",
  "fitness",
  "sports",
  "beauty",
  "toys",
  "books",
  "automotive",
  "music",
  "amazon",
  "flipkart",
  "meesho",
];
const dropDownCategories = [
  "steal Deals",
  "top 5",
  "electronics",
  "fashion",
  "Appliances",
  "gifts",
  "fitness",
  "sports",
  "beauty",
  "toys",
  "books",
  "automotive",
  "music",
  "top deals on Amazon",
  "top deals on Flipkart",
  "top deals on Meesho",
];

const laptopVersionCategories = [
  "steal Deals",
  "electronics",
  "fashion",
  "Appliances",
  "beauty",
];

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function formatCategoryForUrl(cat) {
  return cat.toLowerCase().replace(/\s+/g, "");
}

export default function CategoryNav() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const categoriesToRender = isMobile ? categories : laptopVersionCategories;

  const [activeCategory, setActiveCategory] = useState("steal Deals");

  // Sync active category with URL param
  useEffect(() => {
    if (categoryName) {
      const formatted = categoryName.replace(/-/g, " ").toLowerCase();
      const match = categories.find((cat) => cat.toLowerCase() === formatted);
      if (match) setActiveCategory(match);
    }
  }, [categoryName]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    navigate(`/products/${formatCategoryForUrl(cat)}`);
  };

  return (
    <div className={styles.categoriesNav}>
      <section className={styles.categoriesNavHeader}>
        <article className={styles.categoriesDropDown}>
          <CategoryMenu
            menuData={dropDownCategories}
            onCategorySelect={handleCategoryClick}
          />
        </article>

        <nav className={styles.categoryBar}>
          {categoriesToRender.map((cat) => {
            const key = formatCategoryForUrl(cat);
            const iconUrl = MobileHeaderCategoryIcons[key];

            return (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${
                  activeCategory === cat ? styles.activeCategoryBtn : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {iconUrl && (
                  <div
                    className={`${
                      activeCategory === cat ? styles.categoryIconContainer : ""
                    }`}
                  >
                    <img
                      src={iconUrl}
                      alt={`${cat} icon`}
                      className={styles.categoryIcon}
                    />
                  </div>
                )}
                <p
                  className={`${styles.categoryBtntext} ${
                    activeCategory === cat ? styles.activeCategoryBtntext : ""
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </p>
              </button>
            );
          })}
        </nav>

        <article className={styles.productsorting}>
          <ProductSort onSortChange={(sortOption) => console.log(sortOption)} />
        </article>
      </section>
    </div>
  );
}
