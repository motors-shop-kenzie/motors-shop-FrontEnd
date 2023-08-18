import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/authContext";
import { ModalContext } from "@/contexts/Modal";
import styles from "./styles.module.scss";


export const SellerCard = () => {
  const { user } = useContext(AuthContext);
  const { setShowModal } = useContext(ModalContext);

  return (
    <section className={styles.container__sellerSection}>
      <div className={styles.container__sellerDivName}>
        <h3>{user?.name?.charAt(0)}</h3>
      </div>

      <div className={styles.container__divSellerType}>
        <h2>{user?.name}</h2>
        <span>{user?.isAdmin ? "Anunciante" : "Comprador"}</span>
      </div>

      <p>{user?.description}</p>

      {user?.isAdmin ? (
        <button onClick={() => setShowModal("batata")}>Criar anúncio</button>
      ) : null}
    </section>
  );
};
