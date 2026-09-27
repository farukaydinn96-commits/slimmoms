import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SharedLayout from "./components/Layout/SharedLayout/SharedLayout";
import Loader from "./components/Layout/Loader/Loader";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage"),
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DiaryPage = lazy(() => import("./pages/DiaryPage/DiaryPage"));
const CalculatorPage = lazy(
  () => import("./pages/CalculatorPage/CalculatorPage"),
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<MainPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="diary" element={<DiaryPage />} />
          <Route path="calculator" element={<CalculatorPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
