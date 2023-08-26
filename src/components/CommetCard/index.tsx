import { UserHeader } from "../UserHeader";
import styles from "./styles.module.scss";

interface CardProps {
  user: { name: string };
  comment: string;
  userId: string;
  createdAt: string;
}

export const CommentCard = ({ user, comment, userId, createdAt }: CardProps) => {
  return (
    <li className={styles.container}>
      <div>
        <UserHeader user={user} userId={userId} letter={user?.name?.charAt(0)} />
        <p>{createdAt}</p>
      </div>
      <div className={styles.text}>{comment}</div>
    </li>
  );
};
