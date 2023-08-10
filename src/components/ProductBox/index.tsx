
import styles from "./styles.module.scss";
import { iChildrenProps } from "@/interfaces";

export  const ProductBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

