import eyeOpened from "../../assets/icons/eye.svg?url";
import eyeClosed from "../../assets/icons/eye-blocked.svg?url";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { handleLogin } from "../../redux/auth/auth-operations";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must contain 6 or more characters!")
    .required("Password is required"),
});

const LoginForm = () => {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const changePswdVisibility = () => {
    setIsPswdShown((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        dispatch(handleLogin(values)).then((result) => {
          if (result?.type?.includes("rejected")) {
            setErrorMessage(result?.payload || "Login failed");
          } else {
            setErrorMessage("");
          }
        });
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.loginForm}>
          <Field
            className={s.formInput}
            type="email"
            name="email"
            title="Please enter valid email address, for example 'example@gmail.com'"
            placeholder="Email *"
            required
            id="email"
          />
          {errors.email && touched.email && (
            <div className={s.errorMessage}>* {errors.email}</div>
          )}
          {errorMessage &&
            !touched.email &&
            !touched.password &&
            errorMessage !== "Password is wrong" && (
              <div className={s.errorMessage}>{errorMessage}</div>
            )}

          <Field
            className={`${s.formInput} ${s.passInput}`}
            type={isPswdShown ? "text" : "password"}
            name="password"
            title="Please enter your password. Minimum length 6 symbols"
            placeholder="Password *"
            required
            id="password"
          />
          <button
            className={s.pswdVisBtn}
            onClick={changePswdVisibility}
            type="button"
            aria-label={isPswdShown ? "Hide password" : "Show password"}
          >
            <img
              className={s.pswdBtnImg}
              src={isPswdShown ? eyeOpened : eyeClosed}
              alt="Button show/hide password"
            />
          </button>
          {errors.password && touched.password && (
            <div className={s.errorMessage}>* {errors.password}</div>
          )}
          {errorMessage === "Password is wrong" && (
            <div className={s.errorMessage}>{errorMessage}</div>
          )}

          <div className={s.btnCont}>
            <button type="submit" className={s.btn}>
              Login
            </button>
            <Link to="/forgot-password" className={s.btn}>
              Forgot password
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
