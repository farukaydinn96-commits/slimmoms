import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/products/productOperations";
import styles from "./ProductSearch.module.css";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector((state) => state.products);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    dispatch(searchProducts(query));
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün veya besin ara (Örn: Elma)"
          className={styles.searchInput}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.searchButton}
        >
          {isLoading ? "Aranıyor..." : "Ara"}
        </button>
      </form>

      {/* Hata Durumu */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Arama Sonuçları Listesi */}
      {items.length > 0 && (
        <ul className={styles.resultsList}>
          {items.map((product) => (
            <li key={product._id} className={styles.resultItem}>
              <span className={styles.productTitle}>{product.title}</span>
              <span className={styles.productDetails}>
                {product.calories} kcal / {product.weight}g
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Arama yapılıp sonuç bulunamadıysa */}
      {!isLoading && items.length === 0 && query && (
        <p className={styles.emptyMessage}>Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default ProductSearch;
