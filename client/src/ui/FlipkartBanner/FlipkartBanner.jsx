import React, { useState, useEffect, useRef } from "react";
import styles from "./FlipkartBanner.module.css";

export default function FlipkartBanner() {
  const slides = [
    { id: 1, img: "/flipkart/flipkart1.webp" },
    { id: 2, img: "/flipkart/flipkart3.webp" },
    { id: 3, img: "/flipkart/flipkart4.webp" },
    { id: 4, img: "/flipkart/flipkart5.webp" },
    { id: 5, img: "/flipkart/flipkart4.webp" },
  ];

  const [current, setCurrent] = useState(1); // start from first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slidesRef = useRef(null);

  // Clone first and last slides
  const extendedSlides = [
    slides[slides.length - 1], // last slide clone
    ...slides,
    slides[0], // first slide clone
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle circular reset
  const handleTransitionEnd = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(slides.length);
    } else if (current === slides.length + 1) {
      setIsTransitioning(false);
      setCurrent(1);
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <div
        className={styles.slides}
        ref={slidesRef}
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <a href=" https://fktr.in/WHqlXjv" target="_blank">
              <img
                src={slide.img}
                alt={`Slide ${slide.id}`}
                className={styles.slideImage}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === (current - 1) % slides.length ? styles.activeDot : ""
            }`}
            onClick={() => setCurrent(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
