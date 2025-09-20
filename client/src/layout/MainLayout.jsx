import React from "react";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import HeroSection from "../ui/HeroSection/HeroSection.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
