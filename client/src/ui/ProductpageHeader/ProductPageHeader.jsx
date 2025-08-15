import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import styles from "./ProductPageHeader.module.css";

const ProductPageHeader = ({ title, productCount }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* Left Section */}
      <div className={styles.left}>
        <FiArrowLeft className={styles.icon} onClick={() => navigate(-1)} />
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.productCount}>{productCount} products</div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        {/* <FiSearch className={styles.icon} onClick={() => alert("Search")} />
        <FiHeart className={styles.icon} onClick={() => alert("Wishlist")} />
        <FiShoppingCart className={styles.icon} onClick={() => alert("Cart")} /> */}

        <Link to="/">
          <div className={styles.headerlogo}>
            <img
              src="/SDBlogo/Group7.png"
              alt="Logo"
              className={styles.headerLogoImg}
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default ProductPageHeader;
