"use client";

import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/Forms/Register";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";

export default function Register() {
  return (
    <>
      <NavBar dealer />
      <main className={styles.containerRegisterPage}>
        <RegisterForm />
      </main>
      <Footer path="/register" />
    </>
  );
}
