import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";

const InputSectionField = ({ children }: iChildrenProps) => {
    return <section className={styles.inputSection}>{children}</section>;
};
export { InputSectionField };
