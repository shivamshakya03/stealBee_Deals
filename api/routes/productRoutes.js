import express from "express";
import { getAllProducts, getProductsByCategories } from "../controller/productController.js";

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




export default router;
