import { TUser } from "@/interfaces/user";
import { UserHeader } from "@/components/UserHeader";
import { InputSectionField } from "@/components/InputSectionField";
import { TextArea } from "@/components/Textarea";
import TextAreaStyles from "../../Textarea/style.module.scss";
import { InputFocus } from "@/components/Input/InputFocus";
import { Button } from "@/components/Button";
import ButtonStyled from "../../Button/styles.module.scss";
import styles from "../styles.module.scss";

interface iCommentProps {
  user: TUser | undefined;
}
export default function CreateComment({ user }: iCommentProps) {
  return (
    <div className={styles.createCommentDiv}>
      <UserHeader user={user} userId={user?.id} letter={user?.name?.charAt(0)} />
      <form>
        <InputSectionField>
          <InputFocus>
            <TextArea
              id="newComment"
              className={TextAreaStyles.basicTextAreaWithBorder}
              placeholder="Digitar comentário"
            />
          </InputFocus>
        </InputSectionField>
        <Button className={ButtonStyled.brand1Button} type="button" text="Comentar" />
      </form>
      <div className={styles.commentIdeasDiv}>
        <span>Gostei muito!</span>
        <span>Incrível</span>
        <span>Recomendei para meus amigos!</span>
      </div>
    </div>
  );
}
