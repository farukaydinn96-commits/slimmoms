import eyeOpened from "../../assets/icons/eye.svg?url";
import eyeClosed from "../../assets/icons/eye-blocked.svg?url";
import Button from "../Button/Button";
import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { handleRegistration } from "../../redux/auth/auth-operations";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name length must be at least 2 characters long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must contain 6 or more characters!")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        const result = await dispatch(handleRegistration(values));
        if (result.type === "users/signup/rejected") {
          setErrorMessage(result.payload);
        } else {
          setErrorMessage("");
          actions.resetForm();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.loginForm} noValidate>
          <Field
            className={s.formInput}
            type="text"
            name="name"
            placeholder="Name *"
            autoComplete="name"
            id="name"
          />
          <ErrorMessage
            name="name"
            component="div"
            className={s.errorMessage}
          />
          {/* Show API error message related to name only if no validation error */}
          {!errors.name && errorMessage && (
            <div className={s.errorMessage}>{errorMessage}</div>
          )}

          <Field
            className={s.formInput}
            type="email"
            name="email"
            placeholder="Email *"
            autoComplete="email"
            id="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className={s.errorMessage}
          />
          {/* Show API error message related to email only if no validation error */}
          {!errors.email && errorMessage && (
            <div className={s.errorMessage}>{errorMessage}</div>
          )}

          <div className={s.passwordWrapper}>
            <Field
              className={`${s.formInput} ${s.passInput}`}
              type={isPswdShown ? "text" : "password"}
              name="password"
              placeholder="Password *"
              autoComplete="new-password"
              id="password"
            />
            <button
              className={s.pswdVisBtn}
              type="button"
              onClick={() => setIsPswdShown(!isPswdShown)}
              aria-label={isPswdShown ? "Hide password" : "Show password"}
            >
              <img
                className={s.pswdBtnImg}
                src={isPswdShown ? eyeOpened : eyeClosed}
                alt="Toggle password visibility"
              />
            </button>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className={s.errorMessage}
          />
          {/* Show API error message related to password only if no validation error */}
          {!errors.password && errorMessage && (
            <div className={s.errorMessage}>{errorMessage}</div>
          )}

          <div className={s.btnCont}>
            <Button
              isPrimaryButton={false}
              text={"Register"}
              width={182}
              type="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
