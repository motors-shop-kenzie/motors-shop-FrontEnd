import { CreateCarsSeller } from "./CreateCarsSeller";
import styles from "./styles.module.scss";

export const RenderCarsSeller = () => {
  return (
    <ul className={styles.container__sellerRenderCards}>
      <CreateCarsSeller />
    </ul>
  );
};
