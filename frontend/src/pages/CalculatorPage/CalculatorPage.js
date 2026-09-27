import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CalculatorCalorieForm from '../../components/Calculator/CalculatorCalorieForm/CalculatorCalorieForm';
import Modal from '../../components/Calculator/Modal/Modal';
import DailyCalorieIntake from '../../components/Calculator/DailyCalorieIntake/DailyCalorieIntake';

import { calculateCalories } from '../../redux/calculatorSlice';
import { validateCalculatorForm } from '../../utils/validation';

import banana from '../../assets/images/Banana.png';
import golge from '../../assets/images/golge.png';
import muz from '../../assets/images/muz-1.png';
import strawberry from '../../assets/images/Strawberry-Big-PNG.png';
import yaprak from '../../assets/images/yaprak.png';

import styles from './CalculatorPage.module.css';
console.log('CALCULATOR CSS:', styles);

const initialFormData = {
    height: '',
    desiredWeight: '',
    age: '',
    bloodType: '',
    currentWeight: '',
};

const CalculatorPage = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calories, setCalories] = useState(null);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const validation = validateCalculatorForm(formData);

        setErrors(validation.errors);

        if (!validation.isValid) {
            return;
        }

        const calculatorData = {
            height: Number(formData.height),
            desiredWeight: Number(formData.desiredWeight),
            age: Number(formData.age),
            bloodType: Number(formData.bloodType),
            currentWeight: Number(formData.currentWeight),
        };

        try {
            const result = await dispatch(
                calculateCalories(calculatorData)
            ).unwrap();

            const calculatedCalories =
                result.dailyRate ?? result.dailyCalories ?? null;

            setCalories(calculatedCalories);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Calculator error:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className={styles.page}>
            {/* TABLET */}

            <img
                className={styles.tabletVector3}
                src={muz}
                alt=""
            />

            <img
                className={styles.tabletStrawberry}
                src={strawberry}
                alt=""
            />

            <img
                className={styles.tabletLeaves}
                src={yaprak}
                alt=""
            />

            <img
                className={styles.tabletShadow}
                src={golge}
                alt=""
            />

            {/* DESKTOP */}

            <img
                className={styles.desktopLeaves}
                src={yaprak}
                alt=""
            />

            <img
                className={styles.desktopStrawberry}
                src={strawberry}
                alt=""
            />

            <img
                className={styles.desktopBanana}
                src={banana}
                alt=""
            />

            <img
                className={styles.desktopShadow}
                src={golge}
                alt=""
            />

            <section className={styles.calculator}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Calculate your daily calorie intake right now
                    </h1>

                    <CalculatorCalorieForm
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </section>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <DailyCalorieIntake
                        calories={calories}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </main>
    );
};

export default CalculatorPage;