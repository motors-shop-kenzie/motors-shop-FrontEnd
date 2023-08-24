"use client";

import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/Forms/Register";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";
import PageLoading from "@/components/PageLoading";

export default function Register() {
  return (
    // <PageLoading>
    <>
      <main className={styles.containerRegisterPage}>
        <RegisterForm />
      </main>
      <Footer path="/register" />
      <NavBar />
    </>
    // </PageLoading>
  );
}
