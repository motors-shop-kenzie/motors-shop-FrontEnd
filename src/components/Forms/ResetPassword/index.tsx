import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendEmailResetPasswordData } from "@/interfaces/user";
import { sendEmailResetPasswordSchema } from "@/schemas/userSchema";
import styles from "../styles.module.scss";
import { useAuth } from "@/hooks/useAuth.hook";

export const SendEmailForm = () => {
  const { register, handleSubmit } = useForm<SendEmailResetPasswordData>({
    resolver: zodResolver(sendEmailResetPasswordSchema),
  });

  const { sendEmail } = useAuth();

  const onFormSubmit = (formData: SendEmailResetPasswordData) => {
    sendEmail(formData);
  };

  return (
    <div className={styles.resetForm}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.input}>
          <label htmlFor="email">Informe um e-mail cadastrado para a recuperação de senha</label>

          <input type="email" placeholder="example@.com" {...register("email")} />
        </div>
        <div>
          <button className={styles.brand1Button} type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
