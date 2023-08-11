import styles from "./styles.module.scss";

interface ilabelProps {
    htmlFor: string;
    name: string;
}

export const Label = ({ htmlFor, name }: ilabelProps) => {
    return (
        <label htmlFor={htmlFor} className={styles.labelField}>
            {name}
        </label>
    );
};


