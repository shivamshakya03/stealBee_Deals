import React, { useState, useEffect } from "react";
import styles from "./GiftunderPricing.module.css";
import { Link } from "react-router-dom";

export default function GiftunderPricing() {
  const giftBuckets = [
    {
      img1: "Gifts/coffeemug.jpg",
      img2: "Gifts/toysRubbaru.jpeg",
      img3: "Gifts/candles.jpg",
      img4: "Gifts/chocolaty-gift-hamper.webp",
      label1: "UNDER",
      label2: "₹500",
      link: "/products/gifts",
    },
    {
      img1: "Gifts/watch.webp",
      img2: "Gifts/FrenchVanillaBottle.webp",
      img3: "Gifts/headphone.jpg",
      img4: "Gifts/home_decor.webp",
      label1: "UNDER",
      label2: "₹1000",
      link: "/products/gifts",
    },
    {
      img1: "Gifts/bag.jpg",
      img2: "Gifts/speaker.webp",
      img3: "Gifts/smartwatch.jpg",
      img4: "Gifts/gifthamer.jpeg",
      label1: "UNDER",
      label2: "₹1500",
      link: "/products/gifts",
    },
  ];

  return (
    <section className={styles.wrapper} aria-labelledby="gifts-heading">
      <div className={styles.heading}>
        <p className={styles.festive}>FESTIVE</p>
        <p className={styles.gift}>GIFTS</p>
      </div>

      <div className={styles.miniCard}>
        {giftBuckets.map((gift, i) => (
          <Link to={gift.link} key={i}>
            <GiftCard key={i} gift={gift} />
          </Link>
        ))}
      </div>
    </section>
  );
}

// ✅ Separate component for each gift card
function GiftCard({ gift }) {
  const images = [gift.img1, gift.img2, gift.img3, gift.img4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000); // change every 2s
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.imgContainer}>
      <img src={images[index]} alt={`gift-${index}`} className={styles.imgs} />
      <div className={styles.label}>
        <p className={styles.label1}>{gift.label1}</p>
        <p className={styles.label2}>{gift.label2}</p>
      </div>
    </div>
  );
}
