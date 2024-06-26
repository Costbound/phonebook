import { useDispatch, useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectUsername } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

export default function UserMenu() {
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <p className={css.message}>Hello, {username}</p>
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Log out
      </button>
    </div>
  );
}
