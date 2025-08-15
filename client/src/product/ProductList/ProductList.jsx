import styles from "./ProductList.module.css";
import DealsSection from "../../ui/DealSections/DealsSection.jsx";
import LoadingSpinner from "../../ui/loadingSpinner/LoadingSpinner.jsx";

export default function ProductList({ products, title }) {
  if (!products || products.length === 0) {
    return <LoadingSpinner message="Coming soon..." />;
  }

  return (
    <section className={styles.dealsSectionHeader}>
      <DealsSection title={title} products={products} />
    </section>
  );
}
