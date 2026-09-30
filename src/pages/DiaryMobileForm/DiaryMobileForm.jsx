import { useNavigate } from 'react-router-dom';

import Container from '../../components/Container/Container';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import s from './DiaryMobileForm.module.css';

const DiaryMobileForm = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <main className={s.main}>
        <button
          type="button"
          className={s.backButton}
          onClick={handleBack}
          aria-label="Go back"
        >
          ←
        </button>

        <DiaryAddProductForm />
      </main>
    </Container>
  );
};

export default DiaryMobileForm;
