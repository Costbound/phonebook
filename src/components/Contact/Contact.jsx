import css from "./Contact.module.css";
import { IoPersonSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import Backdrop from "../Backdrop/Backdrop";
import EditModal from "../EditModal/EditModal";

export default function Contact({ data: { name, number, id } }) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenDeleteModal(false);
    setIsOpenEditModal(false);
  };

  return (
    <li className={css.item}>
      <div>
        <p className={css.para}>
          <IoPersonSharp size="18" />
          {name}
        </p>
        <p className={css.para}>
          <FaPhoneAlt size="17" />
          {number}
        </p>
      </div>
      <div className={css.btnWrapper}>
        <button
          className={css.button}
          type="button"
          onClick={() => setIsOpenEditModal(true)}
        >
          <MdModeEdit size="20" />
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => setIsOpenDeleteModal(true)}
        >
          <MdDelete size="24" />
        </button>
      </div>
      {isOpenDeleteModal && (
        <Backdrop onclose={handleCloseModal}>
          <DeleteModal id={id} name={name} onClose={handleCloseModal} />
        </Backdrop>
      )}
      {isOpenEditModal && (
        <Backdrop onclose={handleCloseModal}>
          <EditModal
            id={id}
            name={name}
            number={number}
            onClose={handleCloseModal}
          />
        </Backdrop>
      )}
    </li>
  );
}
