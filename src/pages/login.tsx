"use client";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/Forms/Login";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";

export default function Register() {
  return (
    <>
      <NavBar />
      <main className={styles.containerLoginPage}>
        <LoginForm />
      </main>
      <Footer path="/register" />
    </>
  );
}
