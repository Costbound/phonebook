import { useDispatch } from "react-redux";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import css from "./RegistrationForm.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useId } from "react";

const validation = Yup.object().shape({
  name: Yup.string().required("This field cannot be empty!"),
  email: Yup.string().required("This field cannot be empty!"),
  password: Yup.string().required("This field cannot be empty!"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const pwdId = useId();
  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      <Form>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor={nameId}>
            Name
            <Field className={css.input} name="name" id={nameId} />
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>
          <label className={css.label} htmlFor={emailId}>
            Email
            <Field className={css.input} name="email" id={emailId} />
            <ErrorMessage className={css.error} name="email" component="span" />
          </label>
          <label className={css.label} htmlFor={pwdId}>
            Password
            <Field
              className={css.input}
              name="password"
              type="password"
              id={pwdId}
            />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </label>
        </div>
        <SubmitBtn>Register</SubmitBtn>
      </Form>
    </Formik>
  );
}
