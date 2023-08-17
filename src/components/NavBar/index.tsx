import profileDefault from "@/assets/defaults/profile.svg";
import darkLogo from "@/assets/logo/dark-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./styles.module.scss";

/**
 * Props for the NavBar component.
 *
 * @interface INavBarProps
 * @property {boolean} logged - Indicates if the user is logged in.
 * @property {boolean} dealer - Indicates if the user is a dealer.
 */
interface INavBarProps {
  logged?: boolean;
  dealer?: boolean;
}

/**
 * Navigation bar component that displays different content based on user's login status and role.
 *
 * @param {INavBarProps} props - The props for the NavBar component.
 */
export const NavBar = ({ logged = false, dealer = false }: INavBarProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav className={styles.container}>
      <div className={styles.nav_content}>
        <Link href={"/"}>
          {" "}
          <Image src={darkLogo} alt="Motors Shop dark logo" />
        </Link>

        <button className={styles.button_hamburger} onClick={toggleMenu}>
          {openMenu ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>

        {logged && (
          <div className={styles.profile} onClick={toggleMenu}>
            <Image
              className={styles.profile__icon}
              src={profileDefault}
              alt="Profile Picture"
              width={32}
              height={32}
            />
            <p className={styles.profile__name}>{"Samuel Leão"}</p>
          </div>
        )}

        {!logged && (
          <div className={styles.options_desktop__not_logged}>
            <Link className={styles.options_button__login} href="/login">
              Fazer Login
            </Link>

            <Link className={styles.options_button__register} href="/register">
              Cadastrar
            </Link>
          </div>
        )}
      </div>

      {openMenu && !logged && (
        <div className={styles.options_mobile__not_logged}>
          <Link className={styles.options_button__login} href="/login">
            Fazer Login
          </Link>

          <Link className={styles.options_button__register} href="/register">
            Cadastrar
          </Link>
        </div>
      )}

      {openMenu && logged && (
        <ul className={styles.options__logged}>
          <li>Editar Perfil</li>
          <li>Editar Endereço</li>
          {dealer && <li>Meus Anúncios</li>}
          <li>Sair</li>
        </ul>
      )}
    </nav>
  );
};
