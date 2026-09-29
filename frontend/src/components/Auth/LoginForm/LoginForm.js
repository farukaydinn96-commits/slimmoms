import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../../redux/auth/authOperations';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>LOG IN</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
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
            Log in
          </button>

          <NavLink to="/register" className={styles.navBtn}>
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
