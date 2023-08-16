import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
/* import { InputSectionField } from "@/components/InputSectionField";
 */ import { Label } from "@/components/Label";
import styles from "../styles.module.scss";
import { Button } from "@/components/Button";
import InputStyles from "../../Input/styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import Link from "next/link";
import { InputSectionField } from "@/components/InputSectionField";

export const LoginForm = () => {
  return (
    <div className={styles.loginContainer}>
      <form>
        <div>
          <h1>Login</h1>

          <div className={styles.inputsSection}>
            <InputSectionField>
              <Label htmlFor="email" name="Email" />
              <InputFocus>
                <Input
                  type="email"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar email"
                  id="email"
                />
              </InputFocus>
            </InputSectionField>

            <InputSectionField>
              <Label htmlFor="password" name="Senha" />
              <InputFocus>
                <Input
                  type="password"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar senha"
                  id="password"
                />
              </InputFocus>
            </InputSectionField>
          </div>

          <p>Esqueci minha senha</p>

          <div className={styles.buttonsSection}>
            <Button className={ButtonStyles.brand1Button} text="Entrar" />

            <p className={styles.textBetweenButtons}>Ainda não possui conta?</p>

            <Button
              className={ButtonStyles.grey10BorderGrey4TextGrey0Button}
              text="Cadastrar"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
