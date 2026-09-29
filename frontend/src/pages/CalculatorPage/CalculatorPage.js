import React, { useState } from 'react';
import DailyCaloriesForm from '../../components/Calculator/DailyCaloriesForm/DailyCaloriesForm';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftSide}>
        <h2 className={styles.title}>
          Calculate your daily calorie intake right now
        </h2>
        <DailyCaloriesForm onSubmit={handleFormSubmit} />
      </div>

      <div className={styles.rightSide}>
        {/* Arka plan görselleri CSS ile buraya gelecek */}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              &#10005;
            </button>

            <h2 className={styles.modalTitle}>
              Your recommended daily
              <br />
              calorie intake is
            </h2>

            <div className={styles.calorieResult}>
              <span className={styles.calorieNumber}>2800</span>
              <span className={styles.calorieUnit}>ккал</span>
            </div>

            <hr className={styles.modalDivider} />

            <div className={styles.badFoodsSection}>
              <h4 className={styles.badFoodsTitle}>Foods you should not eat</h4>
              <ol className={styles.badFoodsList}>
                <li>Flour products</li>
                <li>Milk</li>
                <li>Red meat</li>
                <li>Smoked meats</li>
              </ol>
            </div>

            <button className={styles.modalActionButton}>
              Start losing weight
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
