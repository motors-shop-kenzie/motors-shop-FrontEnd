import { SendEmailForm } from "@/components/Forms/ResetPassword";
import { NextPage } from "next";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const SendEmailResetPassword: NextPage = () => {
  const { back } = useRouter();
  return (
    <main className={styles.body}>
      <button className={styles.grey10BorderGrey0Button} onClick={() => back()}>
        Voltar
      </button>
      <SendEmailForm />
    </main>
  );
};

export default SendEmailResetPassword;
