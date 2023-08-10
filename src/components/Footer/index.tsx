import { IoIosArrowUp } from "react-icons/io";
import whiteLogo from "../../assets/logo/white-logo.svg";
import styles from "./styles.module.scss";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={styles.container__footer}>
      <div>
        <h2>
          <Image src={whiteLogo} alt="" />
        </h2>

        <p>© 2022 - Todos os direitos reservados.</p>

        <button>
          <IoIosArrowUp />
        </button>
      </div>
    </footer>
  );
};
