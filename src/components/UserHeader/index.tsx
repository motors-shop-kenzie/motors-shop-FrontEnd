import styles from "./styles.module.scss";

export const UserHeader = () => {
    return(
        <div className={styles.container}>
            <div className={styles.circle}>
                U
            </div>
            <div className={styles.name}>
                User
            </div>
        </div>
    )
}

