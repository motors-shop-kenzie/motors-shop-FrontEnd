import styles from "./styles.module.scss";

interface DetailProps {
    number: number;
    
}

export const Detail = ({number}:DetailProps) => {
    return(
        <div className={styles.container}>
            {number}
        </div>
    )
}

