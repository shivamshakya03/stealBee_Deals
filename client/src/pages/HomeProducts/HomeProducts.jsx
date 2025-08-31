import React, { useEffect } from "react";
import styles from "./HomeProducts.module.css";
import AutoSlider from "../../ui/AutoSlider/AutoSlider";
import DealsSection from "../../ui/DealSections/DealsSection";
import { useDispatch, useSelector } from "react-redux";
import HomeProductGrid from "../../ui/HomeProductUI/HomeProductGrid.jsx";
import LoadingSpinner from "../../ui/loadingSpinner/LoadingSpinner.jsx";

// import selectors (correct names)
import {
  selectAllProducts, // was: selectProducts
  selectProductsLoading, // was: selectLoading
  selectProductsError, // was: selectError
  selectAmazonProducts,
  selectFlipkartProducts,
  selectMeeshoProducts,
} from "../../redux/features/products/productSelector.js";

import {
  fetchProducts,
  fetchAmazonProducts,
  fetchFlipkartProducts,
  fetchMeeshoProducts,
} from "../../redux/features/products/productSlice.js";

export default function HomeProducts() {
  const dispatch = useDispatch();

  // use selectors
  const products = useSelector(selectAllProducts); // used to check if we need to fetch
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const amazonProducts = useSelector(selectAmazonProducts);
  const flipkartProducts = useSelector(selectFlipkartProducts);
  const meeshoProducts = useSelector(selectMeeshoProducts);

  // Fetch products on mount if not already loaded
  useEffect(() => {
    // Fetch general products
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }

    // Fetch store-specific products for homepage sections
    if (!amazonProducts || amazonProducts.length === 0) {
      dispatch(fetchAmazonProducts());
    }

    if (!flipkartProducts || flipkartProducts.length === 0) {
      dispatch(fetchFlipkartProducts());
    }

    if (!meeshoProducts || meeshoProducts.length === 0) {
      dispatch(fetchMeeshoProducts());
    }
  }, [dispatch]);

  // Loading / error states
  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return <LoadingSpinner message={`Error: ${error}`} />;
  }

  {
    console.log(amazonProducts.length, flipkartProducts.length);
  }

  return (
    <section className={styles.homeProducts}>
      {/* Amazon */}
      <div className={styles.productContainer}>
        {amazonProducts.length > 0 && (
          <HomeProductGrid
            title="Amazon"
            products={amazonProducts}
            viewMoreLink="/products/topdealsonamazon"
          />
        )}
      </div>

      {/* Flipkart */}
      <div className={styles.productContainer}>
        {flipkartProducts.length > 0 && (
          <HomeProductGrid
            title="Flipkart"
            products={flipkartProducts}
            viewMoreLink="/products/topdealsonflipkart"
          />
        )}
      </div>

      {/* Meesho */}
      <div className={styles.productContainer}>
        {meeshoProducts.length > 0 && (
          <HomeProductGrid
            title="Meesho"
            products={meeshoProducts}
            viewMoreLink="/products/topdealsonmeesho"
          />
        )}
      </div>

      {/* Fallback: Show general products if store-specific ones aren't available */}
      {(!amazonProducts || amazonProducts.length === 0) &&
        (!flipkartProducts || flipkartProducts.length === 0) &&
        (!meeshoProducts || meeshoProducts.length === 0) &&
        products &&
        products.length > 0 && (
          <div className={styles.productContainer}>
            <HomeProductGrid
              title="Featured Products"
              products={products.slice(0, 12)} // Limit to first 12 products
              viewMoreLink="/products/stealdeals"
            />
          </div>
        )}
    </section>
  );
}
