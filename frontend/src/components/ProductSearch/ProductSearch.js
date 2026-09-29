import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/products/productOperations';
import styles from './ProductSearch.module.css';

// onSelect prop'u eklendi
const ProductSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(state => state.products);

  // Kullanıcı yazdıkça otomatik arama yapar (Butona gerek kalmaz)
  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      dispatch(searchProducts(value));
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  // Ürüne tıklandığında seçimi üst bileşene gönderir ve listeyi kapatır
  const handleSelectProduct = product => {
    if (onSelect) onSelect(product);
    setQuery(product.title); // Inputa seçilen ürünün adını yazar
    setIsDropdownOpen(false); // Dropdown'ı gizler
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter'a basıldığında sayfanın yenilenmesini engeller
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ürün veya besin ara (Örn: Elma)"
          className={styles.searchInput}
          autoComplete="off"
        />
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {isLoading && query.length > 1 && (
        <p className={styles.loadingMessage}>Aranıyor...</p>
      )}

      {/* Arama Sonuçları Listesi (Dropdown) */}
      {isDropdownOpen && items.length > 0 && (
        <ul className={styles.resultsList}>
          {items.map(product => (
            <li
              key={product._id}
              className={styles.resultItem}
              onClick={() => handleSelectProduct(product)}
            >
              <span className={styles.productTitle}>{product.title}</span>
              <span className={styles.productDetails}>
                {product.calories} kcal / {product.weight}g
              </span>
            </li>
          ))}
        </ul>
      )}

      {!isLoading &&
        isDropdownOpen &&
        items.length === 0 &&
        query.length > 1 && (
          <div className={styles.resultsList}>
            <p className={styles.emptyMessage}>Sonuç bulunamadı.</p>
          </div>
        )}
    </div>
  );
};

export default ProductSearch;
