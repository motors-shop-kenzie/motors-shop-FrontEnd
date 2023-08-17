import profileDefault from "@/assets/defaults/profile.svg";
import darkLogo from "@/assets/logo/dark-logo.svg";
import { useAuth } from "@/hooks/useAuth.hook";
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
 *
 */
interface INavBarProps {}

/**
 * Navigation bar component that displays different content based on user's login status and role.
 *
 * @param {INavBarProps} props - The props for the NavBar component.
 */
export const NavBar = (props: INavBarProps) => {
  const { user } = useAuth();
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

        {user?.id && (
          <div className={styles.profile} onClick={toggleMenu}>
            <Image className={styles.profile__icon} src={profileDefault} alt="Profile Picture" width={32} height={32} />
            <p className={styles.profile__name}>{user?.name}</p>
          </div>
        )}

        {!user?.id && (
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

      {openMenu && !user?.id && (
        <div className={styles.options_mobile__not_logged}>
          <Link className={styles.options_button__login} href="/login">
            Fazer Login
          </Link>

          <Link className={styles.options_button__register} href="/register">
            Cadastrar
          </Link>
        </div>
      )}

      {openMenu && user?.id && (
        <ul className={styles.options__logged}>
          <li onClick={() => alert(`"Editar Perfil" ainda não implementado`)}>Editar Perfil</li>
          <li onClick={() => alert(`"Editar Endereço" ainda não implementado`)}>Editar Endereço</li>
          {user.isAdmin && <li onClick={() => alert(`"Meus Anúncios" ainda não implementado`)}>Meus Anúncios</li>}
          <li onClick={() => alert(`"Sair" ainda não implementado`)}>Sair</li>
        </ul>
      )}
    </nav>
  );
};
