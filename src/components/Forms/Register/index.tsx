"use client";

import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { Label } from "@/components/Label";
import styles from "../styles.module.scss";
import { Button } from "@/components/Button";
import { useState, useContext } from "react";
import InputStyles from "../../Input/styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaRegister } from "@/schemas/userSchema";
import { InputSectionField } from "@/components/InputSectionField";
import { AuthContext } from "@/contexts/Auth/authContext";
import { TUserRegister } from "@/interfaces/user";

export const RegisterForm = () => {
  const [accType, setAccType] = useState(Boolean);
  const [buttonType, setButtonType] = useState(true)
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserRegister>({
    resolver: zodResolver(userSchemaRegister),
  });

  const submit: SubmitHandler<TUserRegister> = (formData) => {
    const obj = { ...formData, isAdmin: accType };
    registerUser(obj);
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
                <p>{errors && errors.name?.message}</p>
              </InputFocus>
            </InputSectionField>

            <InputSectionField>
              <Label htmlFor="email" name="Email" />
              <InputFocus>
                <Input
                  register={register("email")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Ex: samuel@kenzie.com.br"
                  id="email"
                />
                <p>{errors && errors.email?.message}</p>
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="cpf" name="CPF" />
              <InputFocus>
                <Input
                  register={register("cpf")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="000.000.000-00"
                  id="cpf"
                />
                <p>{errors && errors.cpf?.message}</p>
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="phone" name="Celular" />
              <InputFocus>
                <Input
                  register={register("telephone")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="(DDD) 90000-0000"
                  id="phone"
                />
                <p>{errors && errors.telephone?.message}</p>
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="birthdate" name="Data de nascimento" />
              <InputFocus>
                <Input
                  register={register("birthdate")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="00/00/00"
                  id="birthdate"
                />
                 <p>{errors && errors.birthdate?.message}</p>
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="description" name="Descrição" />
              <InputFocus>
                <Input
                  register={register("description")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar descrição"
                  id="description"
                />
                 <p>{errors && errors.description?.message}</p>
              </InputFocus>
            </InputSectionField>
          </div>

          <h2 className={styles.subtitleRegister}>Informações de endereço</h2>

          <div className={styles.inputsSectionRegister}>
            <InputSectionField>
              <Label htmlFor="cep" name="CEP" />
              <InputFocus>
                <Input
                  register={register("address.zip_code")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="000.000-00"
                  id="cep"
                />
                 <p>{errors && errors.address?.zip_code?.message}</p>
              </InputFocus>
            </InputSectionField>

            <div className={styles.divAddress}>
              <InputSectionField>
                <Label htmlFor="estate" name="Estado" />
                <InputFocus>
                  <Input
                    register={register("address.state")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar Estado"
                    id="estate"
                  />
                  <p>{errors && errors.address?.state?.message}</p>
                </InputFocus>
              </InputSectionField>
              <InputSectionField>
                <Label htmlFor="city" name="Cidade" />
                <InputFocus>
                  <Input
                    register={register("address.city")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar cidade"
                    id="city"
                  />
                  <p>{errors && errors.address?.city?.message}</p>
                </InputFocus>
              </InputSectionField>
            </div>

            <InputSectionField>
              <Label htmlFor="street" name="Rua" />
              <InputFocus>
                <Input
                  register={register("address.street")}
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar rua"
                  id="street"
                />
               <p>{errors && errors.address?.street?.message}</p>
              </InputFocus>
            </InputSectionField>

            <div className={styles.divAddress}>
              <InputSectionField>
                <Label htmlFor="number" name="Número" />
                <InputFocus>
                  <Input
                    register={register("address.number")}
                    type="number"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Digitar número"
                    id="number"
                  />
                  <p>{errors && errors.address?.number?.message}</p>
                </InputFocus>
              </InputSectionField>
              <InputSectionField>
                <Label htmlFor="complement" name="Complemento" />
                <InputFocus>
                  <Input
                    register={register("address.complement")}
                    type="text"
                    className={InputStyles.basicInputWithBorder}
                    placeholder="Ex: apto 10"
                    id="complement"
                  />
                 <p>{errors && errors.address?.complement?.message}</p>
                </InputFocus>
              </InputSectionField>
            </div>
          </div>

          <h2 className={styles.subtitleRegister}>Tipo de conta</h2>

          <div className={styles.divButtons}>
            <Button
              onClick={() => setAccType(false)}
              className={!accType ? ButtonStyles.brand1Button : ButtonStyles.grey10BorderGrey4TextGrey0Button}
              text="Comprador"
              type="button"
            />

            <Button
              onClick={() => setAccType(true)}
              className={accType ? ButtonStyles.brand1Button : ButtonStyles.grey10BorderGrey4TextGrey0Button}
              text="Anunciante"
              type="button"
            />
          </div>

          <div className={styles.inputsSectionRegister}>
            <InputSectionField>
              <Label htmlFor="password" name="Senha" />
              <InputFocus>
                <Input
                  register={register("password")}
                  type="password"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Digitar senha"
                  id="password"
                />
              </InputFocus>
                <p>{errors && errors.password?.message}</p>
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
                <p>{errors && errors.password?.message}</p>
            </InputSectionField>
          </div>

          <div className={styles.buttonsSectionRegister}>
            <button type="submit" className={ButtonStyles.brand1Button}>
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

