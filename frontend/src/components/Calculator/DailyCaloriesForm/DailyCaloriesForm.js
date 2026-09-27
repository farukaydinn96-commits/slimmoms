import { useState } from 'react';
import CalculatorCalorieForm from '../CalculatorCalorieForm/CalculatorCalorieForm';
import Modal from '../Modal/Modal';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import { calculateDailyCalories } from '../../../utils/calculations';
import { validateCalculatorForm } from '../../../utils/validation';

const initialFormData = {
    height: '',
    desiredWeight: '',
    age: '',
    bloodType: '',
    currentWeight: '',
};

const DailyCaloriesForm = () => {
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

    const handleSubmit = event => {
        event.preventDefault();

        const validation = validateCalculatorForm(formData);

        setErrors(validation.errors);

        if (!validation.isValid) {
            return;
        }

        const calculatedCalories = calculateDailyCalories({
            currentWeight: Number(formData.currentWeight),
            height: Number(formData.height),
            age: Number(formData.age),
            desiredWeight: Number(formData.desiredWeight),
        });

        setCalories(calculatedCalories);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <CalculatorCalorieForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <DailyCalorieIntake
                        calories={calories}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </>
    );
};

export default DailyCaloriesForm;