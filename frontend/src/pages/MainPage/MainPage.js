import DailyCaloriesForm from '../../components/Calculator/DailyCaloriesForm/DailyCaloriesForm';
import styles from './MainPage.module.css';

const MainPage = () => {
    return (
        <main className={styles.page}>
            <section className={styles.calculator}>
                <h1 className={styles.title}>
                    Calculate your daily calorie intake right now
                </h1>

                <DailyCaloriesForm />
            </section>
        </main>
    );
};

export default MainPage;