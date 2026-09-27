import styles from './CalculatorCalorieForm.module.css';

const bloodTypes = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
];

const CalculatorCalorieForm = ({
    formData,
    errors,
    onChange,
    onSubmit,
}) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.fields}>
                <label className={styles.field}>
                    <span>Height *</span>

                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={onChange}
                        min="100"
                        max="250"
                        required
                    />

                    {errors.height && (
                        <span className={styles.error}>{errors.height}</span>
                    )}
                </label>

                <label className={styles.field}>
                    <span>Desired weight *</span>

                    <input
                        type="number"
                        name="desiredWeight"
                        value={formData.desiredWeight}
                        onChange={onChange}
                        min="20"
                        max="300"
                        required
                    />

                    {errors.desiredWeight && (
                        <span className={styles.error}>
                            {errors.desiredWeight}
                        </span>
                    )}
                </label>

                <label className={styles.field}>
                    <span>Age *</span>

                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={onChange}
                        min="18"
                        max="100"
                        required
                    />

                    {errors.age && (
                        <span className={styles.error}>{errors.age}</span>
                    )}
                </label>

                <fieldset className={styles.bloodType}>
                    <legend>Blood type *</legend>

                    <div className={styles.radioGroup}>
                        {bloodTypes.map(type => (
                            <label
                                key={type.value}
                                className={styles.radioLabel}
                            >
                                <input
                                    type="radio"
                                    name="bloodType"
                                    value={type.value}
                                    checked={
                                        formData.bloodType === type.value
                                    }
                                    onChange={onChange}
                                    required
                                />

                                <span>{type.label}</span>
                            </label>
                        ))}
                    </div>

                    {errors.bloodType && (
                        <span className={styles.error}>
                            {errors.bloodType}
                        </span>
                    )}
                </fieldset>

                <label className={styles.field}>
                    <span>Current weight *</span>

                    <input
                        type="number"
                        name="currentWeight"
                        value={formData.currentWeight}
                        onChange={onChange}
                        min="20"
                        max="300"
                        required
                    />

                    {errors.currentWeight && (
                        <span className={styles.error}>
                            {errors.currentWeight}
                        </span>
                    )}
                </label>
            </div>

            <button className={styles.button} type="submit">
                Start losing weight
            </button>
        </form>
    );
};

export default CalculatorCalorieForm;