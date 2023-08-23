import profileDefault from "@/assets/defaults/profile.svg";
import darkLogo from "@/assets/logo/dark-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { useAuth } from "@/hooks/useAuth.hook";

interface INavBarProps {}

export const NavBar = (props: INavBarProps) => {
  const { user, logout, toggleNavBar, openNavBar } = useAuth();
  // const [openMenu, setOpenMenu] = useState<boolean>(false);
  // const toggleMenu = () => setOpenMenu(!openMenu);
  const { push } = useRouter();

  return (
    <nav className={styles.container}>
      <div className={styles.nav_content}>
        <Link href={"/"}>
          {" "}
          <Image src={darkLogo} alt="Motors Shop dark logo" />
        </Link>

        <button className={styles.button_hamburger} onClick={toggleNavBar}>
          {openNavBar ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>

        {user?.id && (
          <div className={styles.profile} onClick={toggleNavBar}>
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

      {openNavBar && !user?.id && (
        <div className={styles.options_mobile__not_logged}>
          <Link className={styles.options_button__login} href="/login">
            Fazer Login
          </Link>

          <Link className={styles.options_button__register} href="/register">
            Cadastrar
          </Link>
        </div>
      )}

      {openNavBar && user?.id && (
        <ul className={styles.options__logged} onClick={(e) => e.stopPropagation()}>
          <li onClick={() => alert(`"Editar Perfil" ainda não implementado`)}>Editar Perfil</li>
          <li onClick={() => alert(`"Editar Endereço" ainda não implementado`)}>Editar Endereço</li>
          {user.isAdmin && <li onClick={() => push(`/SellerHome/${user.id}`)}>Meus Anúncios</li>}
          <li onClick={() => logout()}>Sair</li>
        </ul>
      )}
    </nav>
  );
};
