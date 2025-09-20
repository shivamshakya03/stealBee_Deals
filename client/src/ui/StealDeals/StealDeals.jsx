import React, { useEffect } from "react";

import styles from "./StealDeals.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductsLoading,
  selectToptenDiscounts,
} from "../../redux/features/products/productSelector";
import { fetchToptenDiscounts } from "../../redux/features/products/productSlice";
import { Link } from "react-router-dom";

export default function StealDeals() {
  const dispatch = useDispatch();
  const products = useSelector(selectToptenDiscounts);
  const loading = useSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchToptenDiscounts());
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <p className={styles.headingText}>Steal Deals</p>
      </div>

      <div className={styles.cardWrapper}>
        {loading ? (
          <p>Loading Deals...</p>
        ) : (
          products.map((product) => {
            return (
              <Link to={product.affiliate_link} target="_blank">
                <div className={styles.card} key={product.id}>
                  <div className={styles.imgContainer}>
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      srcset=""
                      className={styles.cardImg}
                    />
                  </div>
                  <div className={styles.cardProductPrice}>
                    <p className={styles.cardDisountPercent}>
                      {product.discount_percent}% Off
                    </p>
                    <p className={styles.cardPrice}>
                      {" "}
                      ₹{product.current_price}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
