import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useId } from "react";

const validation = Yup.object().shape({
  email: Yup.string().required("This field cannot be empty!"),
  password: Yup.string().required("This field cannot be empty!"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const emailId = useId();
  const pwdId = useId();

  const handleSubmit = (values) => {
    dispatch(logIn(values));
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      <Form>
        <div className={css.inputContainer}>
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
        <SubmitBtn>Log in</SubmitBtn>
      </Form>
    </Formik>
  );
}
