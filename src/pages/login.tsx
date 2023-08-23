"use client";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/Forms/Login";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";
import PageLoading from "@/components/PageLoading";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/contexts/Loading";

export default function Login() {
  const { loading } = useContext(LoadingContext);
  return (
    <>
      {loading ? (
        <div className={styles.example}>
          <h1>Carregando...</h1>
        </div>
      ) : (
        <>
          <main className={styles.containerLoginPage}>
            <LoginForm />
          </main>
          <Footer path="/register" />
          <NavBar />
        </>
      )}
    </>
  );
}
