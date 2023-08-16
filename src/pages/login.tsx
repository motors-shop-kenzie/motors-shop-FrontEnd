"use client";

import styles from "./styles.module.scss";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/Forms/Login";
import { NavBar } from "@/components/NavBar";

export default function Register() {
  return (
    <>
      <NavBar dealer /* className={styles.cover} */ />
      <main className={styles.containerLoginPage}>
        <LoginForm></LoginForm>
      </main>
      <Footer path="/register" />
    </>
  );
}
