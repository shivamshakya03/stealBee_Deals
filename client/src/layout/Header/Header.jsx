import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Run once on mount in case page loads scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/">
        <div className={styles.headerLogo}>
          <img
            src="/SDBlogo/Group7icon.png"
            alt="Logo"
            className={styles.headerLogoImg}
          />
          <img
            src="/SDBlogo/Group7text.png"
            alt="Logo"
            className={styles.headerLogotext}
          />
          <img
            src="/SDBlogo/Group7.png"
            alt="Logo"
            className={styles.headerLogoDesktop}
          />
          {/* <span className={styles.headerLogoText}>Stealbee Deals</span> */}
        </div>
      </Link>

      <div className={styles.headerSearch}>
        <input
          className={styles.headerSearchInput}
          type="text"
          placeholder="Search for products, brands or categories..."
        />
      </div>

      {/* <div className={styles.headerLinks}>
        <div className={styles.headerLinksItem}>
          <img
            className={styles.headerLinksItemImg}
            src="/category.png"
            alt="Categories"
          />
          <span className={styles.headerLinksItemText}>Categories</span>
        </div>
        <div className={styles.headerLinksItem}>
          <img
            className={styles.headerLinksItemImg}
            src="/ranking.png"
            alt="Top Deals"
          />
          <span className={styles.headerLinksItemText}>Top Deals</span>
        </div>
      </div> */}
    </header>
  );
}
