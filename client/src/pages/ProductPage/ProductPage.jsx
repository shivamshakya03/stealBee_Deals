// ProductPage.jsx
import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.css";
import Footer from "../../layout/Footer/Footer";
import SubscribeSection from "../../ui/SubscribeSection/SubscribeSection";
import ProductPageHeader from "../../ui/ProductpageHeader/ProductPageHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryNav from "../../ui/CategoryNav/CategoryNav";
import LoadingSpinner from "../../ui/loadingSpinner/LoadingSpinner.jsx";
import ProductList from "../../product/ProductList/ProductList.jsx";
import {
  fetchProducts,
  fetchStealDeals,
  fetchAmazonProducts,
  fetchFlipkartProducts,
  fetchMeeshoProducts,
  fetchProductsByCategory,
} from "../../redux/features/products/productSlice.js";
import ProductSort from "../../ui/ProductSort/ProductSort";
import {
  selectAllProducts,
  selectStealDeals,
  selectAmazonProducts,
  selectFlipkartProducts,
  selectMeeshoProducts,
  selectProductsByCategory,
  selectProductsLoading,
  selectProductsError,
} from "../../redux/features/products/productSelector.js";

const categoryDisplayNames = {
  stealdeals: "Top Deals",
  top5: "Top 5 Deals",
  electronics: "Electronics & Gadgets",
  appliances: "Homeliving & Appliances",
  gifts: "Festive Gifts",
  sports: "Sports & Outdoors",
  fashion: "Fashion & Accessories",
  fitness: "Health & Fitness",
  beauty: "Beauty & Personal Care",
  toys: "Toys & Games",
  books: "Books & Stationery",
  automotive: "Automotive & Accessories",
  music: "Music",
  amazon: "Top Deals on Amazon",
  flipkart: "Top Deals on Flipkart",
  meesho: "Top Deals on Meesho",
  topdealsonamazon: "Top Deals on Amazon",
  topdealsonflipkart: "Top Deals on Flipkart",
  topdealsonmeesho: "Top Deals on Meesho",
};

export default function ProductPage() {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("");
  const { categoryName = "topdeals" } = useParams(); // Default to topdeals

  // Get loading and error states
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  // Helper function to get products based on category
  const getProductsForCategory = () => {
    switch (categoryName) {
      case "topdeals":
      case "top5":
        return useSelector(selectAllProducts);
      case "stealdeals":
        return useSelector(selectStealDeals);
      case "topdealsonamazon":
        return useSelector(selectAmazonProducts);
      case "amazon":
        return useSelector(selectAmazonProducts);
      case "topdealsonflipkart":
        return useSelector(selectFlipkartProducts);
      case "flipkart":
        return useSelector(selectFlipkartProducts);
      case "topdealsonmeesho":
        return useSelector(selectMeeshoProducts);
      case "meesho":
        return useSelector(selectMeeshoProducts);
      default:
        // For regular categories like electronics, fashion, etc.
        return useSelector(selectProductsByCategory(categoryName));
    }
  };

  const products = getProductsForCategory();

  // Fetch products based on category when component mounts or category changes
  useEffect(() => {
    const fetchProductsForCategory = () => {
      switch (categoryName) {
        case "topdeals":
        case "top5":
          dispatch(fetchProducts());
          break;
        case "stealdeals":
          dispatch(fetchStealDeals());
          break;
        case "topdealsonamazon":
          dispatch(fetchAmazonProducts());
          break;
        case "amazon":
          dispatch(fetchAmazonProducts());
          break;
        case "topdealsonflipkart":
          dispatch(fetchFlipkartProducts());
          break;
        case "flipkart":
          dispatch(fetchFlipkartProducts());
          break;
        case "topdealsonmeesho":
          dispatch(fetchMeeshoProducts());
          break;
        case "meesho":
          dispatch(fetchMeeshoProducts());
          break;
        default:
          dispatch(fetchProductsByCategory(categoryName));
          break;
      }
    };

    fetchProductsForCategory();
  }, [dispatch, categoryName]);

  // Sorting helper functions
  const toNum = (v) => (v == null || v === "" ? 0 : Number(v));
  const toDate = (s) =>
    !s ? new Date(0) : new Date(String(s).replace(" ", "T"));
  const getPrice = (p) => toNum(p.current_price ?? p.price ?? p.originalPrice);
  const getDiscount = (p) => toNum(p.discount_percent ?? p.discount);
  const getPopularity = (p) =>
    toNum(p.total_views ?? p.popularity ?? p.views ?? p.rating ?? 0);
  const getCreatedAt = (p) => toDate(p.created_at ?? p.createdAt ?? p.date);

  // Apply sorting to products
  const getSortedProducts = () => {
    if (!products || !Array.isArray(products)) return [];

    let sortedProducts = [...products];

    // For "top5" category, limit to 5 products
    if (categoryName === "top5") {
      sortedProducts = sortedProducts.slice(0, 5);
    }

    if (sortOrder) {
      sortedProducts.sort((a, b) => {
        switch (sortOrder) {
          case "priceLowToHigh":
            return getPrice(a) - getPrice(b);
          case "priceHighToLow":
            return getPrice(b) - getPrice(a);
          case "discountHighToLow":
            return getDiscount(b) - getDiscount(a);
          case "popularity":
            return getPopularity(b) - getPopularity(a);
          case "newestArrivals":
            return getCreatedAt(b) - getCreatedAt(a);
          default:
            return 0;
        }
      });
    }

    return sortedProducts;
  };

  const sortedProducts = getSortedProducts();
  const title = categoryDisplayNames[categoryName] || "Products";

  // Handle error state
  if (error) {
    return (
      <div className={styles.productPage}>
        <ProductPageHeader title={title} productCount={0} />
        <CategoryNav />
        <div className={styles.errorContainer}>
          <div className={styles.error}>
            <LoadingSpinner message={` Error loading products: ${error}`} />

            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        </div>
        <SubscribeSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.productPage}>
      <ProductPageHeader title={title} productCount={sortedProducts.length} />
      <CategoryNav />
      <div className={styles.productSortContainer}>
        <ProductSort onSortChange={setSortOrder} currentSort={sortOrder} />
      </div>

      {loading ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <ProductList products={sortedProducts} title={title} />
      )}

      <SubscribeSection />
      <Footer />
    </div>
  );
}
