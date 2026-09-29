import s from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { getLoadingStatus } from "../../redux/auth/auth-selector";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";

const LoginPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();

  const component = (
    <>
      <h3 className={s.title}>Sign In</h3>
      <LoginForm />
    </>
  );

  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <div className={s.block}>
            <Loader />
          </div>
        ) : (
          component
        )}
      </div>
    </main>
  );
};

export default LoginPage;
