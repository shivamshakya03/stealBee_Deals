import React, { useEffect, useState } from "react";
import DealsSection from "../../ui/DealSections/DealsSection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState("all");
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <div className={styles.loadingSpinner}>
        <img src="/gif_honeybee.gif" alt="Loading..." />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  // ✅ Single filter function so logic isn't repeated
  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "trending") return p.istrending === true;
    return p.tag?.toLowerCase() === activeCategory;
  });

  return (
    <>
      <section className={styles.dealsSectionHeader}>
        {/* Category Buttons */}
        <div className={styles.categoryBar}>
          {["all", "electronics", "fashion", "trending"].map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${
                activeCategory === cat ? styles.activeCategoryBtn : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Render Sections */}
        {activeCategory === "all" ? (
          <>
            <DealsSection title="Top Deals" products={products} />

            {products.filter((p) => p.tag?.toLowerCase() === "electronics")
              .length > 0 && (
              <DealsSection
                title="Tech Gadgets"
                products={products.filter(
                  (p) => p.tag?.toLowerCase() === "electronics"
                )}
              />
            )}

            {products.filter((p) => p.tag?.toLowerCase() === "fashion").length >
              0 && (
              <DealsSection
                title="Fashion"
                products={products.filter(
                  (p) => p.tag?.toLowerCase() === "fashion"
                )}
              />
            )}

            {products.filter((p) => p.tag?.toLowerCase() === "homes").length >
              0 && (
              <DealsSection
                title="Homes & Appliances"
                products={products.filter(
                  (p) => p.tag?.toLowerCase() === "homes"
                )}
              />
            )}
          </>
        ) : filteredProducts.length > 0 ? (
          <DealsSection
            title={
              activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
            }
            products={filteredProducts}
          />
        ) : (
          <div className={styles.noProductFound}>
            <span>No Product Found..</span>
            <img
              src="/gif_honeybee.gif"
              alt="gif_honeybee"
              className={styles.honeybeeGIF}
            />
          </div>
        )}
      </section>
    </>
  );
}
