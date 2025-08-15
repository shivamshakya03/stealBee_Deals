import React, { useState } from "react";
import styles from "./CategoryMenu.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

export default function CategoryMenu({ onCategorySelect, menuData }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.categoriesContainer}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.categoriesTitle}>
        <span>Categories</span>
        <span className={styles.dropdownIcon}>
          {open ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </div>

      {open && (
        <ul className={styles.categoriesList}>
          {menuData.map((category, index) => (
            <li
              key={index}
              className={styles.categoryItem}
              onClick={() => {
                onCategorySelect(category);
                setOpen(false);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
