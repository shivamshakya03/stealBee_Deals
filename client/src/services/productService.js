import apiClient from "./apiClient.js";


// 🔹 Reusable request wrapper for error handling

const request = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    // throm clean error object 
    throw error.response?.data || new Error("Something went wrong!");
  }
};

const productService = {
  // GET /api/products
  getAll: () => request(() => apiClient.get("/products")),

  // GET /api/products/steal-deals
  getStealDeals: () => request(() => apiClient.get("/products/categories/steal-deals")),

  // GET /api/products/topproductsonamazon
  getAmazonProducts: () => request(() => apiClient.get("/products/categories/topproductsonamazon")),

  // GET /api/products/topproductsonflipkart
  getFlipkartProducts: () => request(() => apiClient.get("/products/categories/topproductsonflipkart")),

  // GET /api/products/topproductsonmeesho
  getMeeshoProducts: () => request(() => apiClient.get("/products/categories/topproductsonmeesho")),

   // GET /api/products/categories/:category
  getProductsByCategory: (category) =>
    request(() => apiClient.get(`/products/categories/${category}`)),

  // GET /api/products/:id
  getById: (id) => request(() => apiClient.get(`/products/${id}`)),

  // GET /api/products/search?q=query
  search: (query) => request(() => apiClient.get("/products/search", { params: { q: query } })),

  //GET /api/products.toptenDiscounts
  getTopDiscounts: () => request(() => apiClient.get("/products/topten-discounts"))
};

export default productService;
