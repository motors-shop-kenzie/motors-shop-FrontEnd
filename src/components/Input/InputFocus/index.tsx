import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";

export const InputFocus = ({ children }: iChildrenProps) => {
    return <div className={styles.divInputSection}>{children}</div>;
};
