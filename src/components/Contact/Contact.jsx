import css from "./Contact.module.css";

import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdWork,
  MdDelete,
  MdModeEdit,
  MdHome,
} from "react-icons/md";
import { BsFillPersonBadgeFill } from "react-icons/bs";

import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import Backdrop from "../Backdrop/Backdrop";
import EditModal from "../EditModal/EditModal";
import avatar from "../../assets/no-photo.png";

export default function Contact({
  data: { name, phoneNumber, email, _id, isFavourite, photo, contactType },
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenDeleteModal(false);
    setIsOpenEditModal(false);
  };

  return (
    <li className={css.item}>
      <div className={css.dataContainer}>
        <img src={photo || avatar} alt="Avatar" height="100" />
        <div className={css.paraContainer}>
          <p className={css.para}>
            <IoPersonSharp size="18" />
            {name}
          </p>
          <p className={css.para}>
            <FaPhoneAlt size="17" />
            {phoneNumber}
          </p>
          {email && (
            <p className={css.para}>
              <IoIosMail size="20" />
              {email}
            </p>
          )}
          {contactType === "work" ? (
            <p className={css.para}>
              <MdWork size="20" />
              {contactType.ca}
            </p>
          ) : contactType === "home" ? (
            <p className={css.para}>
              <MdHome size="20" />
              {contactType}
            </p>
          ) : (
            <p className={css.para}>
              <BsFillPersonBadgeFill size="18" />
              {contactType}
            </p>
          )}
        </div>
      </div>
      <div className={css.btnWrapper}>
        <button className={css.button} type="button">
          {isFavourite ? (
            <MdFavorite size="20" />
          ) : (
            <MdFavoriteBorder size="20" />
          )}
        </button>
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
          <DeleteModal id={_id} name={name} onClose={handleCloseModal} />
        </Backdrop>
      )}
      {isOpenEditModal && (
        <Backdrop onclose={handleCloseModal}>
          <EditModal
            id={_id}
            name={name}
            number={phoneNumber}
            onClose={handleCloseModal}
          />
        </Backdrop>
      )}
    </li>
  );
}
