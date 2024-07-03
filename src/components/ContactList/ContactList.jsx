import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.list}>
      {contacts.map((contact) => {
        return <Contact key={contact._id} data={contact} />;
      })}
    </ul>
  );
}
