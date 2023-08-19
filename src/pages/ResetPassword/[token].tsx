import { ResetPasswordForm } from "@/components/Forms/SendEmail";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <main className={styles.body}>
      <ResetPasswordForm token={token as string} />
    </main>
  );
};

export default ResetPassword;
