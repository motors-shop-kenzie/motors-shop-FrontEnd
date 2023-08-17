import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";

interface iSelectProps {
  name: string;
  id: string;
  children: React.ReactNode;
}

export const Select = ({ name, id, children }: iSelectProps) => {
  return (
    <select name={name} id={id} className={styles.select}>
      {children}
    </select>
  );
};
