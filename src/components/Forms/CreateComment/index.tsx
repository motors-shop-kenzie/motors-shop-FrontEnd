import styles from "../styles.module.scss";

export default function CreateComment() {
  return (
    <div className={styles.createCommentDiv}>
      <form>
        <h2>UserName</h2>
        <input type="text" />
      </form>
    </div>
  );
}
