import { useModal } from "@/hooks/modalHook";
import styles from "./styles.module.scss";
import { iChildrenProps } from "@/interfaces";

interface ModalProps {
  text: string;
  children: React.ReactNode;
}

export const Modal = ({ text, children }: ModalProps) => {
  const {setShowModal} = useModal()

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h4 className={styles.text}>{text}</h4>
          <div className={styles.close} onClick={()=>setShowModal("")}>x</div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
