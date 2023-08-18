import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";

export const CommentBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

