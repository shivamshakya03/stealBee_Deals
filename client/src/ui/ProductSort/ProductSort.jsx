import React, { useState } from "react";
import styles from "./ProductSort.module.css";

const sortOptions = [
  { value: "priceLowToHigh", label: "Price: Low to High" },
  { value: "priceHighToLow", label: "Price: High to Low" },
  { value: "discountHighToLow", label: "Discount: High to Low" },
  { value: "popularity", label: "Popularity" },
  { value: "newestArrivals", label: "Newest Arrivals" },
];

export default function ProductSort({ onSortChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  function handleSelect(value) {
    setSelected(value);
    if (onSortChange) onSortChange(value);
    setOpen(false);
  }

  const selectedLabel =
    sortOptions.find((opt) => opt.value === selected)?.label || "Sort by";

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className={styles.arrow}>▼</span>
      </button>

      {open && (
        <ul role="listbox" className={styles.dropdown}>
          {sortOptions.map(({ value, label }) => (
            <li
              key={value}
              role="option"
              aria-selected={selected === value}
              onClick={() => handleSelect(value)}
              tabIndex={0}
              className={`${styles.option} ${
                selected === value ? styles.selected : ""
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
