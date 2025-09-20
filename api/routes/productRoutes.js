import express from "express";
import { getAllProducts, getProductsByCategories, getTopTenDiscountedProducts, trackProductClick } from "../controller/productController.js";

const router = express.Router();


// GET /api/products/categories/steal-deals
// GET /api/products/categories/topproductsonamazon
// GET /api/products/categories/topproductsonflipkart
// GET /api/products/categories/topproductsonmeesho


//GET /api/products
router.get("/", getAllProducts);
router.get("/categories/:category", getProductsByCategories);

// GET /categories/fashion 
// GET /categories/electronics


// for top ten discounted products for home page StealDeals Section
router.get("/topten-discounts", getTopTenDiscountedProducts);


// POST /api/products/:id/click
router.post("/:id/click", trackProductClick);





export default router;
