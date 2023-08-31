/* eslint-disable react-hooks/exhaustive-deps */
import { TUser } from "@/interfaces/user";
import { UserHeader } from "@/components/UserHeader";
import { InputSectionField } from "@/components/InputSectionField";
import { TextArea } from "@/components/Textarea";
import TextAreaStyles from "../../Textarea/style.module.scss";
import { InputFocus } from "@/components/Input/InputFocus";
import { Button } from "@/components/Button";
import ButtonStyled from "../../Button/styles.module.scss";
import styles from "../styles.module.scss";
import comentStyles from "./styles.module.scss";
import { useRequest } from "@/hooks/useRequest";
import api from "@/services/api";
import Toast from "@/components/Toast";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { CommentCard } from "@/components/CommetCard";
import { CommentBox } from "@/components/CommentBox";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { AuthContext } from "@/contexts/Auth/authContext";
import { useModal } from "@/hooks/modalHook";
import { TCarProduct } from "@/interfaces/CarProduc";

interface iCommentProps {
  userComment: TUser | undefined;
  car: TCarProduct | undefined;
}

export interface iComment {
  id: string;
  comment: string;
  user: { name: string };
  userId: string;
  createdAt: string;
  commentId: string;
}
export default function CreateComment({ userComment, car }: iCommentProps) {
  const request = useRequest();
  const cookies = parseCookies();
  const { comment, setComment, getComment } = useContext(CarsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (car && car.id) {
      getComment(car!.id);
    }
  }, [car]);

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }
  const token = cookies["ccm.token"];

  const { register, handleSubmit } = useForm<iComment>({});

  const registerComment = async (data: iComment) => {
    await request({
      tryFn: async () => {
        const res = await api.post(`/comments/${car?.id}`, data);
        const commentData = res.data;
        const objComment = { ...commentData, user: { name: user?.name } };

        setComment((prevComments) => [...prevComments, objComment]);

        Toast({ message: "Comentário enviado!", isSucess: true });
      },
      onErrorFn: () => Toast({ message: "Comentário não enviado!" }),
    });
  };

  const submit: SubmitHandler<iComment> = async (formData) => {
    if (car && car.id) {
      await registerComment(formData);
      await getComment(car!.id);
    }
  };

  return (
    <>
      <div className={comentStyles.commentsContainer}>
        <h2>Comentários</h2>
        <CommentBox>
          {comment!.length === 0 ? (
            <p>Não há comentários.</p>
          ) : (
            comment!.map((com) => (
              <CommentCard
                key={com.id}
                commentId={com.id}
                userId={com.userId}
                user={com.user}
                comment={com.comment}
                createdAt={com.createdAt}
              />
            ))
          )}
        </CommentBox>
      </div>
      <div className={styles.createCommentDiv}>
        {token ? <UserHeader user={user} userId={user?.id} letter={user?.name?.charAt(0)} /> : null}
        <form onSubmit={handleSubmit(submit)}>
          <InputSectionField>
            <InputFocus>
              <TextArea
                id="newComment"
                className={TextAreaStyles.basicTextAreaWithBorder}
                placeholder="Digitar comentário"
                register={register("comment")}
              />
            </InputFocus>
          </InputSectionField>
          {token ? (
            <Button className={ButtonStyled.brand1Button} type="submit" text="Comentar" />
          ) : (
            <Button
              className={ButtonStyled.grey8TextGrey0Button}
              type="button"
              text="Faça o login para comentar"
              disable
            />
          )}
        </form>
        <div className={styles.commentIdeasDiv}>
          <span>Gostei muito!</span>
          <span>Incrível</span>
          <span>Recomendei para meus amigos!</span>
        </div>
      </div>
    </>
  );
}
