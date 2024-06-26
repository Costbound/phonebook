import { Watch } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.container}>
      <Watch color="#000" />
    </div>
  );
}
