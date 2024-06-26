import { useDispatch } from "react-redux";
import css from "./DeleteModal.module.css";
import { deleteContact } from "../../redux/contacts/operations";
export default function DeleteModal({ id, name, onClose }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
    onClose();
  };
  return (
    <>
      <p className={css.para}>
        Are you sure you want delete contact{" "}
        <span className={css.nameSpan}>{name}</span>?
      </p>
      <div className={css.btnWrapper}>
        <button type="button" className={css.yesBtn} onClick={handleDelete}>
          Yes
        </button>
        <button type="button" className={css.noBtn} onClick={onClose}>
          No
        </button>
      </div>
    </>
  );
}
