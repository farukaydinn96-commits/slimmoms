// src/pages/MainPage/MainPage.jsx
import s from "./MainPage.module.css";
import Container from "../../components/Container/Container";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm";

const MainPage = () => {
  return (
    <main>
      <section className={s.section}>
        <Container>
          <h3 className={s.homePage}>HomePage </h3>
          <DailyCaloriesForm />
        </Container>
      </section>
    </main>
  );
};

export default MainPage;
