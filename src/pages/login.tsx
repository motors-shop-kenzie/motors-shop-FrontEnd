"use client";

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/Forms/Login";
import { NavBar } from "@/components/NavBar";

export default function Register() {
  return (
    <main>
      <NavBar dealer /* className={styles.cover} */ />
      <LoginForm></LoginForm>
      <Footer path="/register" />
    </main>
  );
}
