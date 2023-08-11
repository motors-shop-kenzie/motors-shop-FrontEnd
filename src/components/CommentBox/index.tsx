import styles from "./styles.module.scss";
import { iChildrenProps } from "@/interfaces";

export const CommentBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

