import css from "./SubmitBtn.module.css";
export default function SubmitBtn({ children }) {
  return (
    <button type="submit" className={css.button}>
      {children}
    </button>
  );
}
