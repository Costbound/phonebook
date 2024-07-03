import css from "./ContactsPage.module.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useSelector } from "react-redux";
import { selectLoader, selectError } from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const loading = useSelector(selectLoader);
  const error = useSelector(selectError);

  return (
    <div className={css.container}>
      <ContactForm />
      <div>
        {" "}
        <SearchBox />
        {loading && !error && <p className={css.loader}>Loading...</p>}
        <ContactList />
      </div>
    </div>
  );
}
