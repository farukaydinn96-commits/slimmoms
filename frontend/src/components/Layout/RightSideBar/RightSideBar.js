import React from "react";
import { useSelector } from "react-redux";
import styles from "./RightSideBar.module.css";

const RightSideBar = () => {
  const today = new Date().toLocaleDateString("tr-TR");

  const dailyRate = useSelector((state) => state.auth.user?.dailyRate || 0);
  const consumed = useSelector((state) => state.auth.user?.consumed || 0);

  const left = dailyRate - consumed;
  const percentage =
    dailyRate > 0 ? Math.round((consumed / dailyRate) * 100) : 0;

  const notAllowedProducts =
    useSelector((state) => state.auth.user?.notAllowedProducts) || [];

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.summarySection}>
        <h3 className={styles.title}>{today} Özeti</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span>Kalan</span>
            <span>{left} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>Tüketilen</span>
            <span>{consumed} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>Günlük İhtiyaç</span>
            <span>{dailyRate} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>Tüketim Yüzdesi</span>
            <span>{percentage} %</span>
          </li>
        </ul>
      </div>

      <div className={styles.productsSection}>
        <h3 className={styles.title}>Önerilmeyen Yiyecekler</h3>
        {notAllowedProducts.length > 0 ? (
          <ul className={styles.productList}>
            {notAllowedProducts.map((product, index) => (
              <li key={index} className={styles.productItem}>
                {product}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>
            Kalori alımınıza göre önerilmeyen yiyecekler burada listelenecektir.
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
