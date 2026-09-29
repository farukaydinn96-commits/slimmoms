import React from 'react';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <div
      className={`${styles.wrapper} ${products?.length > 4 ? styles.isScrollable : ''}`}
    >
      <div className={styles.scrollContainer}>
        {products && products.length > 0 ? (
          <ul className={styles.list}>
            {products.map(product => (
              <li key={product.id} className={styles.listItem}>
                <span className={styles.name}>{product.title}</span>

                <span className={styles.weight}>{product.weight} g</span>

                <span className={styles.kcal}>
                  {Math.round(product.kcal)} kcal
                </span>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => onDelete(product.id)}
                  aria-label="Ürünü Sil"
                  title="Ürünü Sil"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyList}>
            Bugün için henüz bir ürün eklemediniz.
          </p>
        )}
      </div>
    </div>
  );
};

export default DiaryProductsList;
