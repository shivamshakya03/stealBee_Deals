import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import ProductList from "./product/ProductList/ProductList.jsx";
import CategoryNav from "./ui/CategoryNav/CategoryNav.jsx";
import HeroSection from "./ui/HeroSection/HeroSection.jsx";
import SubscribeSection from "./ui/SubscribeSection/SubscribeSection.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import HomeProducts from "./pages/HomeProducts/HomeProducts.jsx";

function App() {
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
