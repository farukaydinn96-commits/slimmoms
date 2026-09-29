import s from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {
  getLoadingStatus,
  getRegistrationStatus,
} from "../../redux/auth/auth-selector";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const registrationStatus = useSelector(getRegistrationStatus);
  const navigate = useNavigate();

  // Redirect automat când înregistrarea e cu succes
  useEffect(() => {
    if (registrationStatus) {
      navigate("/login"); // sau "/dashboard" sau altă pagină
    }
  }, [registrationStatus, navigate]);

  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <div className={s.block}>
            <Loader />
          </div>
        ) : (
          <>
            <h3 className={s.title}>Register</h3>
            <RegistrationForm />
          </>
        )}
      </div>
    </main>
  );
};

export default RegistrationPage;
