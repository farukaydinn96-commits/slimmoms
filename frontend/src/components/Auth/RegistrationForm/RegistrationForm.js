import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { register } from '../../../redux/auth/authOperations';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>REGISTER</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name *"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email *"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password *"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitBtn}>
            Register
          </button>

          <NavLink to="/login" className={styles.navBtn}>
            Log in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
