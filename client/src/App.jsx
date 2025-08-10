import "./App.css";
import MainLayout from "./layout/MainLayout.jsx";
import ProductList from "./product/ProductList/ProductList.jsx";
import HeroSection from "./ui/HeroSection/HeroSection.jsx";
import SubscribeSection from "./ui/SubscribeSection/SubscribeSection.jsx";

function App() {
  return (
    <>
      <MainLayout>
        <HeroSection />
        <ProductList />
        <SubscribeSection />
      </MainLayout>
    </>
  );
}

export default App;
