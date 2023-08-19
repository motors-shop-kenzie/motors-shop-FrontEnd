import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendEmailResetPasswordData } from "@/interfaces/user";
import { sendEmailResetPasswordSchema } from "@/schemas/userSchema";
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
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email">Informe um e-mail para a recuperação de senha</label>
          <div>
            <input type="email" placeholder="example@.com" {...register("email")} />
          </div>
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
