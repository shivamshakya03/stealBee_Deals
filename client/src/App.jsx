import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import ProductList from "./product/ProductList/ProductList.jsx";
import CategoryNav from "./ui/CategoryNav/CategoryNav.jsx";
import HeroSection from "./ui/HeroSection/HeroSection.jsx";
import SubscribeSection from "./ui/SubscribeSection/SubscribeSection.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import HomeProducts from "./pages/HomeProducts/HomeProducts.jsx";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        let userId = localStorage.getItem("visitor_id");

        if (!userId) {
          userId = uuidv4();
          localStorage.setItem("visitor_id", userId);
        }

        await fetch(`${API_BASE_URL}/visitors/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_identifier: userId }), // ✅ fixed key name
        });

        // const data = await res.json();
        // console.log("Visitor tracked:", data);
      } catch (err) {
        console.error("Error tracking visitor:", err);
      }
    };

    // Track a new visit
    const trackVisit = async () => {
      try {
        await axios.post(`${API_BASE_URL}/visitors/dailyperdaytrack`);
      } catch (err) {
        console.error("Error tracking visit:", err);
      }
    };

    // Fetch daily stats
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/visitors/dailyperdaystats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    // Run them in parallel
    (async () => {
      await Promise.all([trackVisitor(), trackVisit(), fetchStats()]);
    })();

    // Auto-refresh stats every 1 min (optional)
    const interval = setInterval(fetchStats, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HeroSection />
              <CategoryNav />
              <HomeProducts />
              <SubscribeSection />
            </MainLayout>
          }
        />

        {/* Products page without MainLayout */}
        <Route
          path="/products/:categoryName"
          element={
            <ProductPage>
              <CategoryNav />
              <ProductList />
            </ProductPage>
          }
        />

        <Route
          path="/products"
          element={
            <ProductPage>
              <CategoryNav />
              <ProductList />
            </ProductPage>
          }
        />

        <Route path="*" element={<pageNotfound />} />
      </Routes>
    </Router>
  );
}

export default App;
