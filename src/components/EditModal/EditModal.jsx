import css from "./EditModal.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import * as Yup from "yup";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short!")
    .max(50, "Name is too long!")
    .required("This field cannot be empty!"),
  number: Yup.string()
    .min(3, "Number is too Short!")
    .max(50, "Number is too long!")
    .required("This field cannot be empty!"),
});

export default function EditModal({ id, name, number, onClose }) {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();
  const handleEdit = (values) => {
    const editedContact = { ...values, id };
    dispatch(editContact(editedContact));
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={{ name, number }}
        onSubmit={handleEdit}
        validationSchema={validation}
      >
        <Form>
          <div className={css.inputsWrapper}>
            <label className={css.label} htmlFor={nameId}>
              Name
              <Field className={css.input} name="name" id={nameId} />
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </label>
            <label className={css.label} htmlFor={numberId}>
              Number
              <Field className={css.input} name="number" id={numberId} />
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </label>
          </div>
          <div className={css.btnWrapper}>
            <button className={css.editBtn} type="submit">
              Edit
            </button>
            <button className={css.cancelBtn} type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
