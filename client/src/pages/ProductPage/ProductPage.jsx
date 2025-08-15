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
import ProductList from "../../product/ProductList/ProductList";
import {
  fetchProducts,
  setActiveCategory,
} from "../../redux/features/products/productSlice";
import ProductSort from "../../ui/ProductSort/ProductSort";

const categoryDisplayNames = {
  topdeals: "Top Deals",
  top5: "Top 5 Deals",
  electronics: "Electronics & Gadgets",
  appliances: "Homeliving & Appliances",
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
  const [sortOrder, setSortOrder] = useState("");
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const {
    items: allProducts,
    loading,
    activeCategory,
  } = useSelector((state) => state.products);

  // Fetch products if not loaded
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  // Update category & reset sort when category changes
  useEffect(() => {
    dispatch(setActiveCategory(categoryName || "all"));
    setSortOrder("");
  }, [dispatch, categoryName]);

  // Helper functions
  const toNum = (v) => (v == null || v === "" ? 0 : Number(v));
  const toDate = (s) =>
    !s ? new Date(0) : new Date(String(s).replace(" ", "T"));

  const getPrice = (p) => toNum(p.current_price ?? p.price);
  const getDiscount = (p) => toNum(p.discount_percent ?? p.discount);
  const getPopularity = (p) => toNum(p.total_views ?? p.popularity ?? p.views);
  const getCreatedAt = (p) => toDate(p.created_at ?? p.createdAt);

  // Filter & sort logic
  let filteredProducts = [];
  const category = activeCategory?.toLowerCase();

  if (category === "topdeals") {
    filteredProducts = allProducts.filter((p) => getDiscount(p) > 0);
    filteredProducts.sort((a, b) => getDiscount(b) - getDiscount(a));
  } else if (["amazon", "flipkart", "meesho"].includes(category)) {
    filteredProducts = allProducts.filter(
      (p) => p.store_name?.toLowerCase() === category
    );
  } else if (category === "topdealsonamazon") {
    filteredProducts = allProducts.filter(
      (p) => p.store_name?.toLowerCase() === "amazon" && getDiscount(p) > 0
    );
    filteredProducts.sort((a, b) => getDiscount(b) - getDiscount(a));
  } else if (category === "topdealsonflipkart") {
    filteredProducts = allProducts.filter(
      (p) => p.store_name?.toLowerCase() === "flipkart" && getDiscount(p) > 0
    );
    filteredProducts.sort((a, b) => getDiscount(b) - getDiscount(a));
  } else if (category === "topdealsonmeesho") {
    filteredProducts = allProducts.filter(
      (p) => p.store_name?.toLowerCase() === "meesho" && getDiscount(p) > 0
    );
    filteredProducts.sort((a, b) => getDiscount(b) - getDiscount(a));
  } else {
    filteredProducts =
      category === "all"
        ? allProducts
        : allProducts.filter((p) => p.tag?.toLowerCase() === category);
  }

  // Apply user-selected sort
  if (sortOrder) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
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

  const title = categoryDisplayNames[category] || activeCategory || "Products";

  return (
    <div className={styles.productPage}>
      <ProductPageHeader title={title} productCount={filteredProducts.length} />

      <CategoryNav />

      <div className={styles.productSortContainer}>
        <ProductSort onSortChange={setSortOrder} />
      </div>

      {loading ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <ProductList products={filteredProducts} title={title} />
      )}

      <SubscribeSection />
      <Footer />
    </div>
  );
}
