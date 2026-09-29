import React, { useState } from 'react';
// Tasarımı bozan CSS hatasını düzelttik: Orijinal çalışan CSS dosyana tam yol verildi.
import styles from '../CalculatorCalorieForm/CalculatorCalorieForm.module.css';

const bloodTypes = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

const DailyCaloriesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: '',
    desiredWeight: '',
    age: '',
    bloodType: '',
    currentWeight: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Height *</span>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
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
            onChange={handleChange}
            min="20"
            max="300"
            required
          />
          {errors.desiredWeight && (
            <span className={styles.error}>{errors.desiredWeight}</span>
          )}
        </label>

        <label className={styles.field}>
          <span>Age *</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="100"
            required
          />
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </label>

        <fieldset className={styles.bloodType}>
          <legend>Blood type *</legend>
          <div className={styles.radioGroup}>
            {bloodTypes.map(type => (
              <label key={type.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="bloodType"
                  value={type.value}
                  checked={formData.bloodType === type.value}
                  onChange={handleChange}
                  required
                />
                <span className={styles.checkmark}></span>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
          {errors.bloodType && (
            <span className={styles.error}>{errors.bloodType}</span>
          )}
        </fieldset>

        <label className={styles.field}>
          <span>Current weight *</span>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            min="20"
            max="300"
            required
          />
          {errors.currentWeight && (
            <span className={styles.error}>{errors.currentWeight}</span>
          )}
        </label>
      </div>

      <button className={styles.button} type="submit">
        Start losing weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
