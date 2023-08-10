
import styles from "./styles.module.scss";
import { iChildrenProps } from "@/interfaces";

const ProductBox = ({ children }: iChildrenProps) => {
    return(
        <ul className={styles.container}>
            {children}
        </ul>
    )
}

export default ProductBox