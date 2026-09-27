import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="presentation"
        >
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;