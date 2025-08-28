import { supabase } from "../config/supabaseClient.js";



// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      products: data,
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// ✅ Universal category handler


// GET /api/products/categories/steal-deals
// GET /api/products/categories/topproductsonamazon
// GET /api/products/categories/topproductsonflipkart
// GET /api/products/categories/topproductsonmeesho

// GET /api/categories/:category




export const getProductsByCategories = async (req, res) => {
  try {
    const { category } = req.params;
    let query = supabase.from("products").select("*");

    // Handle custom categories
    if (category === "steal-deals") {
      query = query.gte("discount_percent", 70).order("discount_percent", { ascending: false });
   
    } 
    else if (category === "topproductsonamazon") {
      query = query.ilike("store_name", "%amazon%").order("created_at", { ascending: false });
    } 
    else if (category === "topproductsonflipkart") {
      query = query.or(
        `store_name.ilike."%flipkart%",store_name.ilike."%Flipkart%",store_name.ilike."%Flipkat%"`
      ).order("created_at", { ascending: false });
    } 
    else if (category === "topproductsonmeesho") {
      query = query.ilike("store_name", "%meesho%").order("created_at", { ascending: false });
    } 
    else {
      // Default → search by tag field
      query = query.ilike("tag", category).order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ success: false, error });
    }

    return res.status(200).json({
      success: true,
      category,
      count: data.length,
      products: data,
    });

  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
