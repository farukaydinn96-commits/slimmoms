import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteMeal } from "../../redux/products/products-operations";
import s from "./DiaryProductItem.module.css";

const DiaryProductsItem = ({ id, product, grams, calories }) => {
  const dispatch = useDispatch();

  const handleItemDelete = (id) => {
    dispatch(deleteMeal(id));
  };

  return (
    <li className={s.item} id={id}>
      <p className={s.info}>{product}</p>
      <p className={s.info}>{grams} g</p>
      <p className={s.info}>
        {calories} <span className={s.small}>kcal</span>
      </p>
      <button
        className={s.btn}
        type="button"
        onClick={() => {
          handleItemDelete(id);
        }}
      >
        <svg className={s.icon} width="12" height="12">
          <use href="/sprite.svg#close-modal-cross"></use>
        </svg>
      </button>
    </li>
  );
};

DiaryProductsItem.propTypes = {
  id: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  grams: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
};

export default DiaryProductsItem;
