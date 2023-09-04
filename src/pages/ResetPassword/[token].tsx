import { ResetPasswordForm } from "@/components/Forms/SendEmail";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import PageLoading from "@/components/PageLoading";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <PageLoading>
      <main className={styles.body}>
        <ResetPasswordForm token={token as string} />
      </main>
    </PageLoading>
  );
};

export default ResetPassword;
