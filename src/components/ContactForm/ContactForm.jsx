import css from "./ContactForm.module.css";
import { useId } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

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

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameID = useId();
  const telID = useId();
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      <Form className={css.form}>
        <div className={css.inputContainer}>
          <label htmlFor={nameID}>Name</label>
          <Field className={css.input} type="text" name="name" id={nameID} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor={telID}>Number</label>
          <Field className={css.input} type="text" name="number" id={telID} />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <SubmitBtn>Add contact</SubmitBtn>
      </Form>
    </Formik>
  );
}
