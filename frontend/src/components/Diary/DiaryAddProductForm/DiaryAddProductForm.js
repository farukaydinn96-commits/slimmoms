import { useState } from 'react';
import ProductSearch from '../../ProductSearch/ProductSearch';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = ({
  onAdd,
  selectedProduct,
  onSelectProduct,
  isModal = false,
}) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const numericWeight = Number(weight);

    if (
      !selectedProduct ||
      !Number.isFinite(numericWeight) ||
      numericWeight <= 0
    ) {
      return;
    }

    onAdd({
      productId: selectedProduct._id,
      weight: numericWeight,
    });

    setWeight('');
  };

  return (
    <form
      className={`${styles.form} ${isModal ? styles.modalForm : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.productField}>
        <ProductSearch onSelect={onSelectProduct} />
        {/* Seçilen ürün bilgisi form düzenini bozmasın diye buraya alındı */}
        {selectedProduct && (
          <div className={styles.selectedProductText}>
            {selectedProduct.title} ({selectedProduct.calories} kcal)
          </div>
        )}
      </div>

      <div className={styles.weightField}>
        <input
          type="number"
          value={weight}
          onChange={event => setWeight(event.target.value)}
          placeholder="Grams"
          min="1"
          step="1"
        />
      </div>

      <button
        className={styles.addButton}
        type="submit"
        aria-label={isModal ? 'Add product' : 'Add'}
      >
        {isModal ? 'Add' : '+'}
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
