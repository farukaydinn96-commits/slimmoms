import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ product, onDelete }) => {
  const { id, title, weight, kcal } = product;

  return (
    <li className={styles.item}>
      <span className={styles.title}>{title}</span>
      <span className={styles.weight}>{weight} g</span>
      <span className={styles.kcal}>{kcal} kcal</span>
      <button
        className={styles.deleteButton}
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Delete ${title}`}
      >
        ×
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
