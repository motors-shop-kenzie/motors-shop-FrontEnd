import { SendEmailForm } from "@/components/Forms/ResetPassword";
import { NextPage } from "next";
import styles from "./styles.module.scss";

const SendEmailResetPassword: NextPage = () => {
  return (
    <main className={styles.body}>
      <SendEmailForm />
    </main>
  );
};

export default SendEmailResetPassword;
