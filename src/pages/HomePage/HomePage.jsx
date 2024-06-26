import { useSelector } from "react-redux";
import css from "./HomePage.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Phone contacts manager
        <FaPhoneAlt className={css.icon} />
      </h1>
      {!isLoggedIn && (
        <p className={css.para}>For continue Sing in or Sign up</p>
      )}
    </div>
  );
}
