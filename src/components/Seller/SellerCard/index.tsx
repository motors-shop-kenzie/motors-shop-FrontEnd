import { TUser } from "@/interfaces/user";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/authContext";

/* interface ISellerCard {
  user: TUser;
} */

export const SellerCard = (/* { user }: ISellerCard */) => {
  const { user } = useContext(AuthContext);

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

      {user?.isAdmin ? <button>Criar anúncio</button> : null}
    </section>
  );
};
