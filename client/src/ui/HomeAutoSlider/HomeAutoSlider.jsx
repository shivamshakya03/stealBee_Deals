import styles from "./HomeAutoSlider.module.css";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HomeSliderProducts from "../HomeSliderProducts/HomeSliderProducts";

export default function HomeAutoSlider() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileImages = [
    {
      src: "HomeSlider/homebannerphone1.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone2.jpg",

      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone3.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone4.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone5.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone6.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone7.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone8.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone9.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone10.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
    {
      src: "/HomeSlider/homebannerphone11.jpg",
      link: "https://bitli.in/ZufjDbW",
    },
  ];

  const desktopImages = [
    {
      src: "/HomeSlider/homebanner1.jpg",
      link: "https://example.com/desktop1",
    },
    {
      src: "/HomeSlider/homebanner2.jpg",
      link: "https://example.com/desktop2",
    },
    {
      src: "/HomeSlider/homebanner3.jpg",
      link: "https://example.com/desktop3",
    },
    {
      src: "/HomeSlider/homebanner4.jpg",
      link: "https://example.com/desktop3",
    },
    {
      src: "/HomeSlider/homebanner5.jpg",
      link: "https://example.com/desktop3",
    },
    {
      src: "/HomeSlider/homebanner6.jpg",
      link: "https://example.com/desktop3",
    },
    {
      src: "/HomeSlider/homebanner7.jpg",
      link: "https://example.com/desktop3",
    },
  ];

  const imagesToShow = isMobile ? mobileImages : desktopImages;
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className={styles.swiperContainer}
      >
        {imagesToShow.map((img, index) => (
          <SwiperSlide key={index}>
            <a href={img.link}>
              <img
                src={img.src}
                alt={`slide-${index}`}
                className={styles.slideImage}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.sliderProducts}>
        <HomeSliderProducts />
      </div>
    </div>
  );
}
