import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

const brands = [
  {
    id: 1,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 2,
    name: "Flipkart",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Flipkart_logo.png",
  },
  {
    id: 3,
    name: "Meesho",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png",
  },
  {
    id: 4,
    name: "Myntra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png",
    // logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Myntra_logo.png",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide brands
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % brands.length);
    }, 2000); // Slide every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.banner}>
      {/* Left Content */}
      <div className={styles.left}>
        <h1 className={styles.title}>
          🔥 StealBee<span>Deals</span>
        </h1>
        <p className={styles.subtitle}>
          India’s #1 Place for Amazon, Flipkart, Meesho & more top Deals! 🎉
        </p>
        <button className={styles.shopBtn}>Grab Deals Now!</button>
      </div>

      {/* Right Brand Slider */}
      <div className={styles.right}>
        <div className={styles.brandCard}>
          <p className={styles.brandName}>{brands[current].name}</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
