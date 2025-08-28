import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productService.js";

// ==========================
// Async thunks
// ==========================

// --- Thunks --- //
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAll();
      // Extract products array from API response
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch products");
    }
  }
);

export const fetchStealDeals = createAsyncThunk(
  "products/fetchStealDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getStealDeals();
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch steal deals");
    }
  }
);

export const fetchAmazonProducts = createAsyncThunk(
  "products/fetchAmazon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAmazonProducts();
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch Amazon products");
    }
  }
);

export const fetchFlipkartProducts = createAsyncThunk(
  "products/fetchFlipkart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getFlipkartProducts();
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch Flipkart products");
    }
  }
);

export const fetchMeeshoProducts = createAsyncThunk(
  "products/fetchMeesho",
  async (_, { rejectWithValue }) => {
    try {
       const response = await productService.getMeeshoProducts();
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch Meesho products");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await productService.getProductsByCategory(category);
      // Return both category and products for proper state management
      return { 
        category, 
        data: response.products || response 
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch products by category");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getById(id);
      return response.product || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch product details");
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await productService.search(query);
      return response.products || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to search products");
    }
  }
);




// -------------------- Slice --------------------
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    stealDeals: [],
    amazon: [],
    flipkart: [],
    meesho: [],
    categories: {},
    selectedProduct: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Steal Deals
      .addCase(fetchStealDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStealDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.stealDeals = action.payload;
        state.error = null;
      })
      .addCase(fetchStealDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Amazon
      .addCase(fetchAmazonProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmazonProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.amazon = action.payload;
        state.error = null;
      })
      .addCase(fetchAmazonProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Flipkart
      .addCase(fetchFlipkartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlipkartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.flipkart = action.payload;
        state.error = null;
      })
      .addCase(fetchFlipkartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Meesho
      .addCase(fetchMeeshoProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeeshoProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.meesho = action.payload;
        state.error = null;
      })
      .addCase(fetchMeeshoProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { category, data } = action.payload;
        state.categories[category] = data;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Search
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;