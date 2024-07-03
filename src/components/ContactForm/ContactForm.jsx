import css from "./ContactForm.module.css";
import { useId } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short")
    .max(50, "Name is too long")
    .required("This field cannot be empty"),
  phoneNumber: Yup.string()
    .min(3, "Number is too Short")
    .max(50, "Number is too long")
    .required("This field cannot be empty"),
  email: Yup.string().email("Not valid email"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameID = useId();
  const telID = useId();
  const emailId = useId();

  const handleSubmit = ({ name, phoneNumber, email }, actions) => {
    const newContact = { name, phoneNumber };
    if (email) {
      newContact.email = email;
    }
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", phoneNumber: "", email: "" }}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label htmlFor={nameID}>Name*</label>
            <Field className={css.input} type="text" name="name" id={nameID} />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={telID}>Phone number*</label>
            <Field
              className={css.input}
              type="text"
              name="phoneNumber"
              id={telID}
            />
            <ErrorMessage
              className={css.error}
              name="phoneNumber"
              component="span"
            />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={emailId}>Email</label>
            <Field
              className={css.input}
              type="text"
              name="email"
              id={emailId}
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>
          <SubmitBtn>Add contact</SubmitBtn>
        </Form>
      </Formik>
      <div className={css.bg}></div>
    </>
  );
}
