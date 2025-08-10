import React from "react";
import styles from "./SubscribeSection.module.css";

export default function SubscribeSection() {
  return (
    <section className={styles.subscribeSection}>
      <h2>Never Miss a Deal</h2>
      <p>
        Get instant notifications for the best deals on your favorite products.
      </p>
      <div className={styles.formContainer}>
        <input
          className={styles.subscribeEmail}
          type="email"
          placeholder="Enter your email address"
        />
        <button>Subscribe</button>
      </div>
    </section>
  );
}
