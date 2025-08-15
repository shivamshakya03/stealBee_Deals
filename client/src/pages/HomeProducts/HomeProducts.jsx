import React, { useEffect } from "react";
import styles from "./HomeProducts.module.css";
import AutoSlider from "../../ui/AutoSlider/AutoSlider";
import DealsSection from "../../ui/DealSections/DealsSection";
import { useDispatch, useSelector } from "react-redux";
import HomeProductGrid from "../../ui/HomeProductUI/HomeProductGrid";
import { fetchProducts } from "../../redux/features/products/productSlice";
import LoadingSpinner from "../../ui/loadingSpinner/LoadingSpinner";

export default function HomeProducts() {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Fetch products on mount if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);
  // Optional loading / error states
  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return <LoadingSpinner message={`Error: ${error}`} />;
  }

  // Filter by store_name
  const amazonProducts = products.filter(
    (p) => p.store_name?.toLowerCase() === "amazon"
  );
  const flipkartProducts = products.filter(
    (p) => p.store_name?.toLowerCase() === "flipkart"
  );
  const meeshoProducts = products.filter(
    (p) => p.store_name?.toLowerCase() === "meesho"
  );

  return (
    <section className={styles.homeProducts}>
      {/* Auto slider if needed */}
      {/* <div className={styles.autoSliderContainer}>
        <AutoSlider />
      </div> */}

      <div className={styles.productContainer}>
        {amazonProducts.length > 0 && (
          <HomeProductGrid
            title="Amazon"
            products={amazonProducts}
            viewMoreLink="/products/amazon"
          />
        )}
      </div>

      <div className={styles.productContainer}>
        {flipkartProducts.length > 0 && (
          <HomeProductGrid
            title="Flipkart"
            products={flipkartProducts}
            viewMoreLink="/products/flipkart"
          />
        )}
      </div>

      <div className={styles.productContainer}>
        {meeshoProducts.length > 0 && (
          <HomeProductGrid
            title="Meesho"
            products={meeshoProducts}
            viewMoreLink="/products/meesho"
          />
        )}
      </div>
    </section>
  );
}

// /products/amazon → all Amazon products.

// /products/flipkart → all Flipkart products.

// /products/meesho → all Meesho products.

// /products/topdealsonamazon → only Amazon products with discounts, sorted high → low.

// /products/topdealsonflipkart → only Flipkart products with discounts.

// /products/topdealsonmeesho → only Meesho products with discounts.
