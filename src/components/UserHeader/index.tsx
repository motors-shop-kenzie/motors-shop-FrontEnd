// "use client"
import { TUser } from "@/interfaces/user";
import styles from "./styles.module.scss";

interface CardProps {
    user:string
    index:string
    letter:string
}

export const UserHeader = ({user, index, letter}:CardProps) => {
    return (
      <div className={styles.container}>
        <div className={styles.circle}>
          {letter}
        </div>
        <div className={styles.name}>{user}</div>
      </div>
    );
}

