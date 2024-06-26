import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/contacts"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
