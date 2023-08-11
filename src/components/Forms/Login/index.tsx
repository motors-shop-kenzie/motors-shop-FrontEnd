import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";

interface DetailProps {}

export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1>Login</h1>

      <InputSectionField>
        <Label htmlFor="email" name="email" />
        <InputFocus>
          <Input
            type="email"
            className={styles.basicInputWithBorder}
            placeholder="Digite seu email..."
            id="email"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="password" name="password" />
        <InputFocus>
          <Input
            type="password"
            className={styles.basicInputWithBorder}
            placeholder="Digite sea senha..."
            id="password"
          />
        </InputFocus>
      </InputSectionField>

      <p>Esqueci a senha</p>

      <Button className={styles.brand1Button} text="Entrar" />

      <p>ainda não possui conta?</p>
      
      <Button className={styles.grey10BorderGrey0Button} text="Cadastrar" />
    </div>
  );
};
