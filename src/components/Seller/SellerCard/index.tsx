import styles from "./styles.module.scss";

export const SellerCard = () => {
  return (
    <section className={styles.container__sellerSection}>
      <div className={styles.container__sellerDivName}>
        <h3>SL</h3>
      </div>

      <div className={styles.container__divSellerType}>
        <h2>Samuel Leão</h2>
        <span>Anunciante</span>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <button>Criar anuncio</button>
    </section>
  );
};
