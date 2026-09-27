import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/auth/authOperations";
import styles from "./LoginForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçersiz e-posta adresi")
    .required("E-posta alanı zorunludur"),
  password: Yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .required("Şifre alanı zorunludur"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/calculator");
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        login({
          email: values.email,
          password: values.password,
        }),
      );
      resetForm();
    },
  });

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Giriş Yap</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            E-posta *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.errorInput : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorText}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Şifre *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.errorInput : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.errorText}>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.primaryButton}>
            Giriş Yap
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/registration")}
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
