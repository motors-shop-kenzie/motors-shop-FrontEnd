import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas/userSchema";
import { ResetPasswordData } from "@/interfaces/user";
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
    <div>
      <p>Recuperação de senha</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email">Nova senha</label>
          <div>
            <input type="password" placeholder="Sua nova senha" className="user-form-input" {...register("password")} />
          </div>
        </div>
        <div>
          <label htmlFor="password">Confirmação da senha</label>
          <div className="mt-2">
            <input type="password" placeholder="Confirmação da senha" {...register("passwordConfirm")} />
          </div>
        </div>
        <div>
          <button type="submit">Atualizar senha</button>
        </div>
      </form>
    </div>
  );
};
