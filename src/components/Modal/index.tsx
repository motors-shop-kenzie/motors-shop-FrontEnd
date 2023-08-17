import { useModal } from "@/hooks/modalHook";
import styles from "./styles.module.scss";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ title, children }: ModalProps) => {
  const { setShowModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
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
