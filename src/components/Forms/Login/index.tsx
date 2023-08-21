"use client";

import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import InputStyles from "../../Input/styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import { InputSectionField } from "@/components/InputSectionField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchemaLogin } from "@/schemas/userSchema";
import { TUserLogin } from "@/interfaces/user";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/authContext";
import styles from "../styles.module.scss";
import Link from "next/link";

export const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserLogin>({
    resolver: zodResolver(userSchemaLogin),
  });

  const submit = (formData: TUserLogin) => {
    loginUser(formData);
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <h1>Login</h1>

          <div className={styles.inputsSection}>
            <InputSectionField>
              <Label htmlFor="email" name="Email" />
              <InputFocus>
                <Input
                  id="email"
                  type="email"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar email"
                  register={register("email")}
                />
              </InputFocus>
            </InputSectionField>
            {errors.email?.message && <p>{errors.email?.message}</p>}

            <InputSectionField>
              <Label htmlFor="password" name="Senha" />
              <InputFocus>
                <Input
                  id="password"
                  type="password"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar senha"
                  register={register("password")}
                />
              </InputFocus>
            </InputSectionField>
            {errors.password?.message && <p>{errors.password?.message}</p>}
          </div>

          <Link href="/resetPassword">Esqueci minha senha</Link>

          <div className={styles.buttonsSection}>
            <Button className={ButtonStyles.brand1Button} text="Entrar" />

            <p className={styles.textBetweenButtons}>Ainda não possui conta?</p>

            <Button
              className={ButtonStyles.grey10BorderGrey4TextGrey0Button}
              text="Cadastrar"
              onClick={() => router.push("/register")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
