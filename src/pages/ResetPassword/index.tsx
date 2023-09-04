import { SendEmailForm } from "@/components/Forms/ResetPassword";
import { NextPage } from "next";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import PageLoading from "@/components/PageLoading";

const SendEmailResetPassword: NextPage = () => {
  const { back } = useRouter();
  return (
    <PageLoading>
      <main className={styles.body}>
        <button className={styles.grey10BorderGrey0Button} onClick={() => back()}>
          Voltar
        </button>
        <SendEmailForm />
      </main>
    </PageLoading>
  );
};

export default SendEmailResetPassword;
