import { Button } from "@/components/Button";
import { Modal } from "../index";
import styles from "../styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";

export default function ConfirmDeleteAccountModal() {
  return (
    <Modal title="Deletar perfil">
      <p className={styles.textModalDelete}>Tem certeza que deseja deletar sua conta? Essa ação não tem volta.</p>
      <section className={styles.deleteButtonsSection}>
        <Button className={ButtonStyles.grey6TextDarkButton} text="Cancelar" type="button" />
        <Button
          className={ButtonStyles.feedbackAlert3TextFeedbackAlert1Button}
          text="Confirmar e Excluir"
          type="submit"
        />
      </section>
    </Modal>
  );
}
