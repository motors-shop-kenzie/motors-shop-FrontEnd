import styles from "./styles.module.scss";

interface DetailProps {
    number: number;
    
}

const Detail = ({number}:DetailProps) => {
    return(
        <div className={styles.container}>
            {number}
        </div>
    )
}

export default Detail