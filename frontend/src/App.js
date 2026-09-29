import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // useSelector eklendi

import { refreshUser } from './redux/auth/authOperations';

import SharedLayout from './components/Layout/SharedLayout/SharedLayout';
import Loader from './components/Layout/Loader/Loader';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const RegistrationPage = lazy(
  () => import('./pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(
  () => import('./pages/CalculatorPage/CalculatorPage')
);

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* PUBLIC ROUTES (Sadece giriş YAPMAMIŞ kullanıcılar görebilir) */}
          {/* Eğer giriş yapıldıysa zorla /diary sayfasına yönlendirilirler */}
          <Route
            index
            element={
              isLoggedIn ? <Navigate to="/diary" replace /> : <MainPage />
            }
          />
          <Route
            path="register"
            element={
              isLoggedIn ? (
                <Navigate to="/diary" replace />
              ) : (
                <RegistrationPage />
              )
            }
          />
          <Route
            path="login"
            element={
              isLoggedIn ? <Navigate to="/diary" replace /> : <LoginPage />
            }
          />

          {/* PRIVATE ROUTES (Sadece giriş YAPMIŞ kullanıcılar görebilir) */}
          {/* Eğer giriş yapılmadıysa zorla /login sayfasına yönlendirilirler */}
          <Route
            path="diary"
            element={
              isLoggedIn ? <DiaryPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="calculator"
            element={
              isLoggedIn ? <CalculatorPage /> : <Navigate to="/login" replace />
            }
          />

          {/* Yanlış bir URL girilirse anasayfaya at */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
