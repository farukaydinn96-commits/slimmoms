import PropTypes from "prop-types";
import s from "../ButtonPlus/ButtonPlus.module.css";

const ButtonPlus = ({ type = "submit", onClick }) => {
  return (
    <button onClick={onClick} type={type} className={s.button}>
      <svg className={s.icon} width="23" height="23">
        <use href="/sprite.svg#plus" />
      </svg>
    </button>
  );
};

ButtonPlus.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonPlus;
