import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ message }) {
  return (
    <div className={styles.noProductFound}>
      <span>{message}</span>
      <img
        src="/gif_honeybee.gif"
        alt="gif_honeybee"
        className={styles.honeybeeGIF}
      />
    </div>
  );
}
