import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "../components/PublicRoute/PublicRoute";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

import { useSelector } from "react-redux";
import {
  getLoginStatus,
  getUserDailyDiet,
  getLoadingStatus,
} from "../redux/auth/auth-selector";

import Loader from "../components/Loader/Loader";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const CalculatorPage = lazy(() =>
  import("../pages/CalculatorPage/CalculatorPage")
);
const DiaryPage = lazy(() => import("../pages/DiaryPage/DiaryPage"));
const DiaryMobileForm = lazy(() =>
  import("../pages/DiaryMobileForm/DiaryMobileForm")
);

const AppRouter = () => {
  const isLogin = useSelector(getLoginStatus);
  const isDailyDiet = useSelector(getUserDailyDiet);
  const isLoading = useSelector(getLoadingStatus);

  // 🔄 Așteaptă autentificarea înainte de redirect fallback
  if (isLoading) {
    return <Loader />;
  }

  const fallbackRedirect = !isLogin ? (
    <Navigate to="/" replace />
  ) : isDailyDiet ? (
    <Navigate to="/diary" replace />
  ) : (
    <Navigate to="/calculator" replace />
  );

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary-mobile-form" element={<DiaryMobileForm />} />
        </Route>

        {/* Wildcard redirect */}
        <Route path="*" element={fallbackRedirect} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
