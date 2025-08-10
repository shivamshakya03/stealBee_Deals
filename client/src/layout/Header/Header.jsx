import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img
          src="/honey-bee-logo.png"
          alt="Logo"
          className={styles.headerLogoImg}
        />
        <span className={styles.headerLogoText}>Stealbee Deals</span>
      </div>

      <div className={styles.headerSearch}>
        <input
          className={styles.headerSearchInput}
          type="text"
          placeholder="Search for products, brands or categories..."
        />
      </div>

      <div className={styles.headerLinks}>
        <div>Categories</div>
        <div>Trending Deals</div>
      </div>

      <button>
        <img
          src="/three-dot.png"
          alt="Sidebar-three-dot"
          className={styles.threedot}
        />
      </button>
    </header>
  );
}
