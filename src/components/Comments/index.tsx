import { TUser } from "@/interfaces/user";
import { CommentBox } from "../CommentBox";
import { CommentCard } from "../CommetCard";

import styles from "./styles.module.scss";

interface iCommentProps {
  user: TUser | undefined;
}
export default function Comments({ user }: iCommentProps) {
  return (
    <div className={styles.commentsContainer}>
      <h2>Comentários</h2>
      <CommentBox>
        <CommentCard user={user} />
      </CommentBox>
    </div>
  );
}
