import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";

export  const ProductBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

