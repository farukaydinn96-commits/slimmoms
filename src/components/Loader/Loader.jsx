// src/components/Loader/Loader.jsx
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.backdrop}>
      <div className={s.loader}></div>
      <p className={s.text}>Calculating your perfect diet...</p>
    </div>
  );
}
