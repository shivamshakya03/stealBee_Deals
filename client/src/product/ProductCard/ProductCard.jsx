import React from "react";
import {
  getTagBackgroundColor,
  getTagColor,
  storeLogo,
} from "../../utils/tagColorCode.js";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  // Early return if no product yet
  if (!product) {
    return null; // or a loading skeleton
  }
  return (
    <article>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <img
            src={product.image_url || "/stealbee-logo.jpg"}
            alt={product.product_name}
            loading="lazy"
          />
          <span className={styles.discountBadge}>
            -{product.discount_percent}%
          </span>
        </div>

        {/* <div className={styles.storeBadge}>
          <img
            src={storeLogo[product.store_name?.toLowerCase() || ""]}
            alt={product.store_name}
            className={styles.storeLogo}
          />
        </div> */}
        <div className={styles.productInfo}>
          <span
            className={styles.tag}
            style={{
              backgroundColor: getTagBackgroundColor(product.tag),
              color: getTagColor(product.tag),
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              fontWeight: "700",
            }}
          >
            {product.tag}
          </span>
          <h3 className={styles.productTitle}>{product.product_name}</h3>
          <p className={styles.productDesc}>{product.description}</p>
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>
              ₹{product.current_price}
            </span>
            <span className={styles.oldPrice}>
              ₹{product.old_price?.toLocaleString("en-IN")}{" "}
            </span>
            <span className={styles.discountPricePercent}>
              (-
              {product.discount_percent
                ? Math.round(product.discount_percent).toLocaleString("en-IN")
                : 0}
              % OFF)
            </span>
          </div>
          <p className={styles.updatedTime}>Updated 4 hours ago</p>
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.buyBtn}>
              <img
                src="/trolley.png"
                alt="Shopping trolley"
                className={styles.shoppingTrolleyIcon}
              />
              <span>Buy Now</span>
            </div>
          </a>

          {/* <div className={styles.storeBadge}>
            <img
              src={storeLogo[product.store_name?.toLowerCase() || ""]}
              alt={product.store_name}
              className={styles.storeLogo}
            />
          </div> */}
        </div>
      </div>
    </article>
  );
}

// Product_Name: Nike Air Shoes
// description: Lightweight running shoes
// image_url: https://example.com/shoes.jpg
// current_price: 2999
// old_price: 3999
// store_name: Nike Official Store
// tag: fashion
// affiliated_link: https://amzn.to/something
