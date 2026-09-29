import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { getLoadingStatus } from "../../redux/auth/auth-selector";
import PropTypes from "prop-types";

import s from "../Modal/Modal.module.css";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, component }) {
  const isLoading = useSelector(getLoadingStatus);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <div onClick={onBackdropClose} className={s.overlay}>
      <div className={s.modal}>
        <button type="button" onClick={onClose} className={s.button}>
          <svg className={s.icon} width={12} height={12} viewBox="0 0 32 32">
            <path d="M4 4 L28 28 M28 4 L4 28" stroke="black" strokeWidth="4" />
          </svg>
        </button>
        {isLoading ? (
          <div className={s.loading}>
            <p>Loading...</p>
          </div>
        ) : (
          component
        )}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  component: PropTypes.node,
};
