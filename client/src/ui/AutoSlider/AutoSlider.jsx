import React, { useEffect, useState } from "react";
import styles from "./AutoSlider.module.css";

const slides = [
  {
    img: "/storeLogo/amazonlogo.svg",
    bg: "linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)", // Amazon
  },
  {
    img: "/storeLogo/Flipkart_Logo.svg",
    bg: "linear-gradient(135deg, #0a192f, #2874F0)", // Flipkart
  },
  {
    img: "/storeLogo/meesho.svg",
    bg: "linear-gradient(135deg, #1a1a2e, #ff2b85)", // Meesho
  },
];

export default function AutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.slider}
      style={{
        background: slides[current].bg,
        transition: "background 0.6s ease-in-out",
      }}
    >
      <img src="/greatDeals.png" alt="" className={styles.greatDealsImage} />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
        >
          <img
            src={slide.img}
            alt={`Slide ${index + 1}`}
            className={styles.sliderImage}
          />
        </div>
      ))}
    </div>
  );
}
