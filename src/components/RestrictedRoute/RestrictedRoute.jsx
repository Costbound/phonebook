import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PrivateRoute({ component, redirectTo = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? component : <Navigate to={redirectTo} />;
}
