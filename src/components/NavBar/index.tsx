import profileDefault from "@/assets/defaults/profile.svg";
import darkLogo from "@/assets/logo/dark-logo.svg";
import { useModal } from "@/hooks/modalHook";
import { useAuth } from "@/hooks/useAuth.hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import ConfirmDeleteAccountModal from "../Modal/ConfirmDeleteAccountModal";
import { ProfileAddressModal } from "../Modal/ProfileAddress";
import { ProfileSettingsModal } from "../Modal/ProfileSettings";
import styles from "./styles.module.scss";

interface INavBarProps {}

export const NavBar = (_: INavBarProps) => {
  const { user, logout, openNavBar, setOpenNavBar } = useAuth();
  const { setShowModal, showModal } = useModal();
  const toggleMenu = () => setOpenNavBar(!openNavBar);

  const handleProfile = () => {
    setShowModal("settings");
    toggleMenu();
  };

  const handleAddress = () => {
    setShowModal("address");
    toggleMenu();
  };

  const handleAnnouncements = () => {
    push(`/SellerHome/${user?.id}`);
    toggleMenu();
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  const { push } = useRouter();

  return (
    <nav className={styles.container}>
      {showModal === "delete" ? <ConfirmDeleteAccountModal /> : null}
      {showModal === "address" ? <ProfileAddressModal /> : null}
      {showModal === "settings" ? <ProfileSettingsModal /> : null}
      <div className={styles.nav_content}>
        <Link href={"/"}>
          {" "}
          <Image src={darkLogo} alt="Motors Shop dark logo" />
        </Link>

        <button className={styles.button_hamburger} onClick={toggleMenu}>
          {openNavBar ? <IoCloseSharp /> : <GiHamburgerMenu />}
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
          <li onClick={handleProfile}>Editar Perfil</li>
          <li onClick={handleAddress}>Editar Endereço</li>
          {user.isAdmin && <li onClick={handleAnnouncements}>Meus Anúncios</li>}
          <li onClick={handleLogout}>Sair</li>
        </ul>
      )}
    </nav>
  );
};
