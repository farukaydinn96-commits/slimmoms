import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/auth/authOperations';
import styles from './LoginPage.module.css';

// Dosya isimleri senin ekran görüntüne (klasörüne) göre düzeltildi!
import vectorImg from '../../assets/images/golge.png';
import bananaImg from '../../assets/images/Banana.png';
import strawberryImg from '../../assets/images/Strawberry-Big-PNG.png';
import leavesImg from '../../assets/images/yaprak.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SOL PANEL - FORM */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>GİRİŞ YAP</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="E-posta *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                className={styles.input}
                placeholder="Şifre *"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.loginBtn}>
                Giriş
              </button>
              <Link to="/register" className={styles.registerLinkBtn}>
                Kayıt Ol
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* SAĞ PANEL - RESİMLER */}
      <div className={styles.rightPanel}>
        <img
          src={vectorImg}
          alt="background vector"
          className={styles.vectorBg}
        />
        <img src={bananaImg} alt="banana" className={styles.banana} />
        <img
          src={strawberryImg}
          alt="strawberry"
          className={styles.strawberry}
        />
        <img src={leavesImg} alt="leaves" className={styles.leaves} />
      </div>
    </div>
  );
};

export default LoginPage;
