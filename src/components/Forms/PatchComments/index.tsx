/* eslint-disable react-hooks/exhaustive-deps */
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import styles from "../styles.module.scss";
import { useModal } from "@/hooks/modalHook";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { InputFocus } from "@/components/Input/InputFocus";
import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";

export const PatchComments = () => {
  const { patchComment } = useContext(CarsContext);
  const { register, handleSubmit } = useForm();
  const { closeModal } = useModal();
  const { editingCommentId, deleteComment } = useContext(CarsContext);

  const submit = (data: any) => {
    patchComment(data, editingCommentId!);
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <InputSectionField>
          <Label htmlFor="updateComment" name="Comentário" />
          <InputFocus>
            <TextArea
              className={TextAreaStyles.basicTextAreaWithBorder}
              placeholder={"comentário"}
              register={register("comment")}
              id="updateComment"
            />
          </InputFocus>
        </InputSectionField>
        <Button className={ButtonStyles.brand3TextBrand4Button} text="Salvar alterações" type="submit" />
      </form>
      <Button
        onClick={() => deleteComment(editingCommentId!)}
        className={ButtonStyles.feedbackAlert3TextFeedbackAlert1Button}
        text="Apagar"
      />
    </div>
  );
};
