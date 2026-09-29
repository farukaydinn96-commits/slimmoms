import Container from "../../components/Container/Container";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import s from "./DiaryMobileForm.module.css";

const DiaryMobileForm = () => {
  return (
    <Container>
      <main className={s.main}>
        <DiaryAddProductForm />
      </main>
    </Container>
  );
};

export default DiaryMobileForm;
