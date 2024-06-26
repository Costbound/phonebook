import css from "./Layout.module.css";
import AppBar from "../AppBar/AppBar";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <Toaster position="top-right" />
    </div>
  );
}
