import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "./Logo.svg";

export const Header = () => {
  return (
    <header>
      <nav className={styles.container}>
        <Image src={logo} alt="logo" />
        <ul>
          <li>
            <Link href="/login">Fazer Login</Link>
          </li>
          <li className={styles.register}>
            <Link href="/register">Cadastrar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
