import styles from "./Footer.module.css";

export default function Footer() {
  const categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Fashion",
    "Accessories",
  ];
  const supportLinks = [
    "Help Center",
    "Contact Us",
    "Deal Submission",
    "Price Alerts",
  ];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className={styles.footer}>
      <div className={styles.stealbeeFlexCategories}>
        <div className={styles.stealbeeDetails}>
          <div className={styles.footerLogo}>
            <img src="/logo-bee.jpg" alt="StealBee Logo" />
            <p>Stealbee Deals</p>
          </div>

          <div className={styles.footerDescription}>
            Your Ultimate Destination for the best Deals on tech gadgets and
            fashion items.
          </div>
        </div>

        <div className={styles.stealbeeCategories}>
          <h4>Categories</h4>
          <ul>
            {categories.map((category) => (
              <li className={styles.categoriesLinks} key={category}>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stealbeeSupport}>
          <h4>Support</h4>
          <ul>
            {supportLinks.map((link) => (
              <li key={link} className={styles.supportItem}>
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stealbeeLegal}>
          <h4>Legal</h4>
          <ul>
            {legalLinks.map((link) => (
              <li key={link} className={styles.legalLinks}>
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className={styles.footerDivider} />

      <div className={styles.footerBottom}>
        <p>
          &copy; 2025 StealBee Deals. All rights reserved. Best deals updated
          hourly.
        </p>
      </div>
    </footer>
  );
}
