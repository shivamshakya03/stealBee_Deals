import { createSelector } from "@reduxjs/toolkit";

const selectProductsState = (state) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (products) => products.items
);

export const selectStealDeals = createSelector(
  [selectProductsState],
  (products) => products.stealDeals
);

export const selectAmazonProducts = createSelector(
  [selectProductsState],
  (products) => products.amazon
);

export const selectFlipkartProducts = createSelector(
  [selectProductsState],
  (products) => products.flipkart
);

export const selectMeeshoProducts = createSelector(
  [selectProductsState],
  (products) => products.meesho
);

export const selectProductsByCategory = (category) =>
  createSelector([selectProductsState], (products) => products.categories[category] || []);

export const selectProductById = createSelector(
  [selectProductsState],
  (products) => products.selectedProduct
);

export const selectSearchResults = createSelector(
  [selectProductsState],
  (products) => products.searchResults
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => products.loading
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (products) => products.error
);

export const selectToptenDiscounts = createSelector(
  [selectProductsState],
  (products) => products.toptenDiscounts
);
