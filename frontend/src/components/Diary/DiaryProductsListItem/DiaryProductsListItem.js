const DiaryProductsListItem = ({ product, onDelete }) => {
  const { title, grams, calories } = product;

  return (
    <li>
      <span>{title}</span>
      <span>{grams} g</span>
      <span>{calories} kcal</span>
      <button type="button" onClick={() => onDelete(product._id)}>
        ×
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
