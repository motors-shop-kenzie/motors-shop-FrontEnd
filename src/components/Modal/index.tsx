import { useModal } from "@/hooks/modalHook";
import styles from "./styles.module.scss";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ title, children }: ModalProps) => {
  const { setShowModal, closeModal, showModal } = useModal();

  return (
    <div className={styles.container} onClick={showModal != "" ? closeModal : undefined}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.close} onClick={() => setShowModal("")}>
            x
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
