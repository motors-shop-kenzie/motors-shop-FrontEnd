import { SendEmailForm } from "@/components/Forms/ResetPassword";
import { NextPage } from "next";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const SendEmailResetPassword: NextPage = () => {
  const { back } = useRouter();
  return (
    <main className={styles.body}>
      <SendEmailForm />
      <button onClick={() => back()}>Voltar</button>
    </main>
  );
};

export default SendEmailResetPassword;
