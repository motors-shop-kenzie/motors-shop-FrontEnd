import { TUser } from "@/interfaces/user";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface CardProps {
  user: TUser | undefined;
  letter: string | undefined;
  userId: string | undefined;
}
export const UserHeader = ({ user, userId, letter }: CardProps) => {
  const { push } = useRouter();
  const redirect = () => {
    console.log(userId);
    push(`/checkSellerPage/${userId}`);
  };
  return (
    <div className={styles.container} onClick={() => redirect()}>
      <div className={styles.circle}>{letter}</div>
      <div className={styles.name}>{user?.name}</div>
    </div>
  );
};
