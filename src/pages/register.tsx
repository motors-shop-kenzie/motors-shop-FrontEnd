"use client";

import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/Forms/Register";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";
import PageLoading from "@/components/PageLoading";
import { useContext } from "react";
import { LoadingContext } from "@/contexts/Loading";

export default function Register() {
  const { loading } = useContext(LoadingContext);
  return (
    <>
      {loading ? (
        <div>
          <h1>Carregando...</h1>
        </div>
      ) : (
        <>
          <main className={styles.containerRegisterPage}>
            <RegisterForm />
          </main>
          <Footer path="/register" />
          <NavBar />
        </>
      )}
    </>
  );
}
