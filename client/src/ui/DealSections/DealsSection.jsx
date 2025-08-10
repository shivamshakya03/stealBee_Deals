import { useState, useEffect } from "react";
import ProductCard from "../../product/ProductCard/ProductCard.jsx";
import styles from "./DealSections.module.css";
import { categoryIcons } from "../../utils/tagColorCode.js";

export default function DealsSection({ title, products }) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1920) {
        setItemsPerView(6);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(5);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerView < products.length) {
      setStartIndex((prev) => prev + itemsPerView);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - itemsPerView);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerView);
  return (
    <section className={styles.dealsSection}>
      <div className={styles.sectionHeader}>
        <h2>
          <span>
            <img
              className={styles.dealSectionIcon}
              src={categoryIcons[title.toLowerCase().split(" ")[0]]}
              alt={`${title} Icon`}
            />
          </span>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {startIndex > 0 ? "View less" : ""}
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerView >= products.length}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {startIndex + itemsPerView < products.length ? "View More" : ""}
          </button>
        </div>
      </div>

      <div className={styles.productGrid}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
