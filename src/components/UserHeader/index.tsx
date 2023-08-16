import { TUser } from "@/interfaces/user";
import styles from "./styles.module.scss";

interface CardProps {
  user: TUser | undefined;
  index: string | undefined;
  letter: string | undefined;
}
export const UserHeader = ({ user, index, letter }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>{letter}</div>
      <div className={styles.name}>{user?.name}</div>
    </div>
  );
};
