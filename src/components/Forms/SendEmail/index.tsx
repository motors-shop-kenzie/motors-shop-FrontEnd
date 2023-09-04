import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas/userSchema";
import { ResetPasswordData } from "@/interfaces/user";
import styles from "../styles.module.scss";
import { useAuth } from "@/hooks/useAuth.hook";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { register, handleSubmit } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { resetPassword } = useAuth();

  const onFormSubmit = (formData: ResetPasswordData) => {
    resetPassword(formData, token);
  };

  return (
    <div className={styles.resetForm}>
      <h2>Recuperação de senha</h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.input}>
          <label htmlFor="email">Nova senha</label>

          <input type="password" placeholder="Sua nova senha" className="user-form-input" {...register("password")} />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Confirmação da senha</label>

          <input type="password" placeholder="Confirmação da senha" {...register("passwordConfirm")} />
        </div>
        <div>
          <button className={styles.brand1Button} type="submit">
            Atualizar senha
          </button>
        </div>
      </form>
    </div>
  );
};
