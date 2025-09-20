import React from "react";
import styles from "./HomeSliderProducts.module.css";
import { Link } from "react-router-dom";

export default function HomeSliderProducts() {
  const miniCardinfo = [
    {
      title: "Hot Mobile Deals",
      img: "/Homepageimg/phone.jpg",
      link: "/products/electronics",
    },
    {
      title: "Trendy Fashion Steals",
      img: "/Homepageimg/fashion.jpg",
      link: "/products/fashion",
    },
    {
      title: "Top Gadget Discounts",
      img: "/Homepageimg/electronics.jpg",
      link: "/products/electronics",
    },
    {
      title: "Smart Home Deals",
      img: "/Homepageimg/homedecor.webp",
      link: "/products/appliances",
    },
    {
      title: "Beauty Steals Here",
      img: "/Homepageimg/kincare.webp",
      link: "/products/beauty",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        {miniCardinfo.map((card, i) => {
          return (
            <Link to={card.link} key={i}>
              <div key={i} className={styles.card}>
                <img
                  src={card.img}
                  alt={card.title}
                  className={styles.cardimg}
                />
                <p>{card.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
