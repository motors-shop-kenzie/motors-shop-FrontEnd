import styles from "./styles.module.scss";
import { iChildrenProps } from "@/interfaces";

const CommentBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

export default CommentBox