import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeProductGrid.module.css";
import ProductCard from "../../product/ProductCard/ProductCard";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

export default function HomeProductGrid({ title, products, viewMoreLink }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <LoadingSpinner message="Loading..." />;
  }

  // Adjust visible count to match your grid's row size
  const visibleProducts = products.slice(0, 6);

  return (
    <section className={styles.dealsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconContainer}>
          <img
            src="/CategoriesIcon/TopDeals.svg"
            alt=""
            className={styles.topdealIcon}
          />
          <h2>{title}</h2>
        </div>

        {/* View More Button */}
        <div className={styles.viewMoreContainer}>
          <button
            className={styles.viewMoreBtn}
            onClick={() => navigate(`${viewMoreLink}`)}
          >
            View More
          </button>
        </div>
      </div>

      {/* products - only first row */}
      <div className={styles.productGrid}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View More Button */}
      <div className={styles.viewMoreContainerMobile}>
        <button
          className={styles.viewMoreBtn}
          onClick={() => navigate(`${viewMoreLink}`)}
        >
          View More
        </button>
      </div>
    </section>
  );
}
