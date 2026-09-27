import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/auth/authOperations";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>KAYIT OL</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="İsim *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              className={styles.input}
              placeholder="E-posta *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.input}
              placeholder="Şifre *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className={styles.buttonGroup}>
            {/* Kayıt sayfasında ana buton Kayıt Ol (Turuncu), ikincil buton Giriş (Beyaz) */}
            <button type="submit" className={styles.registerBtn}>
              Kayıt Ol
            </button>
            <Link to="/login" className={styles.loginLinkBtn}>
              Giriş
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
