import React from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heading}>
        <div>
          <span className={styles.orange}>Best Deals </span>
          <span className={styles.darkBlue}>on Amazon, </span>
        </div>

        <div>
          <span className={styles.darkBlue}> Flipkart, Meesho </span>
          <span className={styles.darkBlue}>& </span>
          <span className={styles.darkBlue}>more</span>
        </div>
      </h1>
      <p className={styles.subtitle}>
        Track prices, find deals, save money on your favorite products
      </p>
      <button className={styles.telegramBtn}>
        <a
          href="https://t.me/stealbeedeals"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our Telegram channel for instant deals
        </a>
      </button>

      <p className={styles.telegramSubtitle}>
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
