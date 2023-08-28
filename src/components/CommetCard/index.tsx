import { UserHeader } from "../UserHeader";
import styles from "./styles.module.scss";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/Auth/authContext";
import { useModal } from "@/hooks/modalHook";
import { CommentPatchModal } from "../Modal/CommentPatchModal";
import { CarsContext } from "@/contexts/Cars/CarsContext";

interface CardProps {
  user: { name: string };
  comment: string;
  userId: string;
  createdAt: string;
  commentId: any;
}

export const CommentCard = ({ user, comment, userId, createdAt, commentId }: CardProps) => {
  const retrieveCurrentDate = (date: Date) => {
    const currentDate = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayActual = currentDate.getDate();
    const monthActual = currentDate.getMonth() + 1;
    const yearActual = currentDate.getFullYear();

    const diffYear = yearActual - year;
    const diffDay = dayActual - day;
    const diffMonth = monthActual - month;

    return diffYear >= 2
      ? `há ${diffYear} ${diffYear === 1 ? "ano" : "anos"}`
      : diffYear === 1
      ? "no ano passado"
      : diffMonth >= 2
      ? `há ${diffMonth} ${diffMonth === 1 ? "mês" : "meses"}`
      : diffMonth === 1
      ? "no mês passado"
      : diffDay > 7
      ? `há mais de uma semana`
      : diffDay > 1
      ? `há ${diffDay} ${diffDay === 1 ? "dia" : "dias"}`
      : diffDay === 1
      ? "Ontem"
      : "Hoje";
  };
  const { setShowModal } = useModal();
  const { user: loggedInUser } = useContext(AuthContext);
  const { editingCommentId, setEditingCommentId } = useContext(CarsContext);
  const { showModal } = useModal();

  const handleEditClick = () => {
    setShowModal("commentUpdate");
    setEditingCommentId(commentId);
  };

  return (
    <li className={styles.container}>
      <div>
        <UserHeader user={user} userId={userId} letter={user?.name?.charAt(0)} />
        <p>{retrieveCurrentDate(new Date(createdAt))}</p>
      </div>
      <div className={styles.text}>{comment}</div>

      {loggedInUser?.id === userId && (
        <div>
          <button onClick={() => handleEditClick()}>
            <CiEdit size={20} />
          </button>
          {showModal === "commentUpdate" ? <CommentPatchModal /> : null}
        </div>
      )}
    </li>
  );
};
