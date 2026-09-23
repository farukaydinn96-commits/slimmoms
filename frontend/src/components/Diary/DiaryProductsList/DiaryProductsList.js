import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';

const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <ul>
      {products.map(product => (
        <DiaryProductsListItem
          key={product._id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default DiaryProductsList;
