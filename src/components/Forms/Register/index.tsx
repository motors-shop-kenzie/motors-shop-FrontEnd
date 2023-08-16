import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
/* import { InputSectionField } from "@/components/InputSectionField";
 */ import { Label } from "@/components/Label";
import styles from "../styles.module.scss";
import { Button } from "@/components/Button";
import { useState, useContext } from "react";
import InputStyles from "../../Input/styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/contexts/User/UserContext";
import { RegisterData, userSchemaRegister } from "./validator";
import { InputSectionField } from "@/components/InputSectionField";

export const RegisterForm = () => {
  const [accType, setAccType] = useState(Boolean);
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(userSchemaRegister),
  });

  const submit = (formData: RegisterData) => {
    console.log("oi");
    console.log(formData);
    /*     registerUser(data);
     */
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <h1>Cadastro</h1>
          <h2 className={styles.subtitleRegister}>Informações pessoais</h2>

          <div className={styles.inputsSectionRegister}>
            <InputSectionField>
              <Label htmlFor="name" name="Nome" />
              <InputFocus>
                <Input
                  register={register("name")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Ex: Samuel Leão"
                  id="name"
                />
              </InputFocus>
            </InputSectionField>

            <InputSectionField>
              <Label htmlFor="email" name="Email" />
              <InputFocus>
                <Input
                  {...register("email")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Ex: samuel@kenzie.com.br"
                  id="email"
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="cpf" name="CPF" />
              <InputFocus>
                <Input
                  {...register("cpf")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="000.000.000-00"
                  id="cpf"
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="phone" name="Celular" />
              <InputFocus>
                <Input
                  {...register("phone")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="(DDD) 90000-0000"
                  id="phone"
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="birthdate" name="Data de nascimento" />
              <InputFocus>
                <Input
                  {...register("birthdate")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="00/00/00"
                  id="birthdate"
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="description" name="Descrição" />
              <InputFocus>
                <Input
                  {...register("description")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar descrição"
                  id="description"
                />
              </InputFocus>
            </InputSectionField>
          </div>

          <h2 className={styles.subtitleRegister}>Informações de endereço</h2>

          <div className={styles.inputsSectionRegister}>
            <InputSectionField>
              <Label htmlFor="cep" name="CEP" />
              <InputFocus>
                <Input
                  {...register("address.zip_code")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="000.000-00"
                  id="cep"
                />
              </InputFocus>
            </InputSectionField>

            <div className={styles.divAddress}>
              <InputSectionField>
                <Label htmlFor="estate" name="Estado" />
                <InputFocus>
                  <Input
                    {...register("address.state")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar Estado"
                    id="estate"
                  />
                </InputFocus>
              </InputSectionField>
              <InputSectionField>
                <Label htmlFor="city" name="Cidade" />
                <InputFocus>
                  <Input
                    {...register("address.city")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar cidade"
                    id="city"
                  />
                </InputFocus>
              </InputSectionField>
            </div>

            <InputSectionField>
              <Label htmlFor="street" name="Rua" />
              <InputFocus>
                <Input
                  {...register("address.street")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar rua"
                  id="street"
                />
              </InputFocus>
            </InputSectionField>

            <div className={styles.divAddress}>
              <InputSectionField>
                <Label htmlFor="house_number" name="Número" />
                <InputFocus>
                  <Input
                    {...register("address.number")}
                    type="number"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar número"
                    id="house_number"
                  />
                </InputFocus>
              </InputSectionField>
              <InputSectionField>
                <Label htmlFor="complement" name="Complemento" />
                <InputFocus>
                  <Input
                    {...register("address.complement")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Ex: apto 10"
                    id="complement"
                  />
                </InputFocus>
              </InputSectionField>
            </div>
          </div>

          <h2 className={styles.subtitleRegister}>Tipo de conta</h2>

          <div className={styles.divButtons}>
            <Button
              onClick={() => setAccType(false)}
              className={ButtonStyles.brand1Button}
              text="Comprador"
            />

            <Button
              onClick={() => setAccType(true)}
              className={ButtonStyles.grey10BorderGrey4TextGrey0Button}
              text="Anunciante"
            />
          </div>

          <div className={styles.inputsSectionRegister}>
            <InputSectionField>
              <Label htmlFor="password" name="Senha" />
              <InputFocus>
                <Input
                  {...register("password")}
                  type="password"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar senha"
                  id="password"
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="password_confirmation" name="Confirmar senha" />
              <InputFocus>
                <Input
                  type="password"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Confirmar senha"
                  id="password_confirmation"
                />
              </InputFocus>
            </InputSectionField>
          </div>

          <div className={styles.buttonsSectionRegister}>
            <Button
              type="submit"
              className={ButtonStyles.brand1Button}
              text="Finalizar cadastro"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
