import { ResetPasswordForm } from "@/components/Forms/SendEmail";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <main>
      <ResetPasswordForm token={token as string} />
    </main>
  );
};

export default ResetPassword;
