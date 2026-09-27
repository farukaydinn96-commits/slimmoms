import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ calories, onClose }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your daily calorie intake</h2>

            <p className={styles.calories}>{calories} kcal</p>

            <button
                className={styles.button}
                type="button"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default DailyCalorieIntake;