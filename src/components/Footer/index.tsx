import { IoIosArrowUp } from "react-icons/io";
import whiteLogo from "../../assets/logo/white-logo.svg";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IFooterProps {
  path: string;
}

export const Footer = ({ path }: IFooterProps) => {
  return (
    <footer className={styles.container__footer}>
      <div>
        <h2>
          <Image src={whiteLogo} alt="" />
        </h2>

        <p>© 2022 - Todos os direitos reservados.</p>

        <Link href={path}>
          <button>
            <IoIosArrowUp />
          </button>
        </Link>
      </div>
    </footer>
  );
};
