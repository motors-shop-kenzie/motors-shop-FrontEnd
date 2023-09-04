import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/authContext";
import { ModalContext } from "@/contexts/Modal";
import styles from "./styles.module.scss";
import { TUser } from "@/interfaces/user";

import ButtonStyled from "../../Button/styles.module.scss";

interface ISellerCardProps {
  clickedUser?: TUser;
}

export const SellerCard = ({ clickedUser }: ISellerCardProps) => {
  const { user } = useContext(AuthContext);
  const { setShowModal } = useContext(ModalContext);

  return (
    <section className={styles.container__sellerSection}>
      <div className={styles.container__sellerDivName}>
        <h3>{clickedUser ? clickedUser.name?.charAt(0) : user?.name?.charAt(0)}</h3>
      </div>

      <div className={styles.container__divSellerType}>
        <h2>{clickedUser ? clickedUser.name : user?.name}</h2>
        <span>
          {clickedUser
            ? clickedUser.isAdmin
              ? "Anunciante"
              : "Comprador"
            : user?.isAdmin
            ? "Anunciante"
            : "Comprador"}
        </span>
      </div>

      <p>{clickedUser ? clickedUser.description : user?.description}</p>

      {clickedUser ? null : user?.isAdmin ? (
        <button onClick={() => setShowModal("batata")} className={ButtonStyled.brand4TextBrand1Button}>
          Criar anúncio
        </button>
      ) : null}
    </section>
  );
};
