"use client";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/Forms/Login";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";
import PageLoading from "@/components/PageLoading";

export default function Login() {
  return (
    <PageLoading>
      <main className={styles.containerLoginPage}>
        <LoginForm />
      </main>
      <Footer path="/register" />
      <NavBar />
    </PageLoading>
  );
}
