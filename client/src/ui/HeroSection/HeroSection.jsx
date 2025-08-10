import React from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heading}>
        <span className={styles.darkBlue}>Best Deals on </span>
        <span className={styles.orange}>Tech </span>
        <span className={styles.darkBlue}>& </span>
        <span className={styles.orange}>Fashion</span>
      </h1>
      <p className={styles.subtitle}>
        Track prices, find deals, save money on your favorite products
      </p>
      <button className={styles.telegramBtn}>
        Join Our Telegram Channel for Instant Deals
      </button>

      <p className={styles.subtitle}>
        Get notified first about flash sales and exclusive offers
      </p>

      <div className={styles.heroButtons}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeYellow}`}>
            Price Tracking
          </span>
          <span className={`${styles.badge} ${styles.badgeBlue}`}>
            Deal Alerts
          </span>
          <span className={`${styles.badge} ${styles.badgeGreen}`}>
            Verified Deals
          </span>
        </div>
      </div>
    </section>
  );
}
