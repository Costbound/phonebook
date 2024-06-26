import css from "./Backdrop.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Backdrop({ onclose, children }) {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} type="button" onClick={onclose}>
          <IoIosCloseCircleOutline size="26" />
        </button>
        {children}
      </div>
    </div>
  );
}
