"use client";

import React, { useState, useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO, differenceInYears } from "date-fns";
import { userSchemaRegister } from "@/schemas/userSchema";
import { AuthContext } from "@/contexts/Auth/authContext";
import { TUserRegister } from "@/interfaces/user";
import InputStyles from "../../Input/styles.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import styles from "../styles.module.scss";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import InputMask from "react-input-mask";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";

export const RegisterForm = () => {
  const [accType, setAccType] = useState(Boolean);
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TUserRegister>({
    resolver: zodResolver(userSchemaRegister),
  });

  const submit: SubmitHandler<TUserRegister> = (formData) => {
    const obj = { ...formData, isAdmin: accType };
    registerUser(obj);
  };

  const isBirthdateValid = (value: string) => {
    const parsedDate = parseISO(value);
    const age = differenceInYears(new Date(), parsedDate);

    if (age < 18 || age > 130) {
      return false;
    }

    const [yearStr, monthStr, dayStr] = value.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return false;
    }

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    return true;
  };

  const isCPFValid = (value: string) => {
    const cleanedCPF = value.replace(/\D/g, "");

    if (cleanedCPF.length !== 11 || /^(\d)\1+$/.test(cleanedCPF)) {
      return false;
    }

    const calculateDigit = (digits: number[]) => {
      const sum = digits.reduce((acc, digit, index) => {
        return acc + parseInt(String(digit)) * (digits.length + 1 - index);
      }, 0);
      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      return remainder;
    };

    const cpfDigits = Array.from(cleanedCPF).map(Number);
    const firstDigit = calculateDigit(cpfDigits.slice(0, 9));
    const secondDigit = calculateDigit(cpfDigits.slice(0, 9).concat(firstDigit));

    return cleanedCPF.charAt(9) === String(firstDigit) && cleanedCPF.charAt(10) === String(secondDigit);
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
            {errors.name?.message && <p>{errors.name?.message}</p>}

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
              </InputFocus>
            </InputSectionField>
            <p>{errors.email?.message && errors.email?.message}</p>

            <InputSectionField>
              <Label htmlFor="cpf" name="CPF" />
              <InputFocus>
                <InputMask
                  mask="999.999.999-99"
                  placeholder="000.000.000-00"
                  {...register("cpf", {
                    validate: (value) => isCPFValid(value) || "CPF inválido",
                  })}
                  className={InputStyles.basicInputWithBorder}
                  id="cpf"
                />
              </InputFocus>
            </InputSectionField>
            {errors.cpf && <p>{errors.cpf?.message}</p>}

            <InputSectionField>
              <Label htmlFor="telephone" name="Celular" />
              <InputFocus>
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="(DDD) 90000-0000"
                  {...register("telephone")}
                  type="tel"
                  className={InputStyles.basicInputWithBorder}
                  id="phone"
                />
              </InputFocus>
            </InputSectionField>
            {errors.telephone && <p>{errors.telephone?.message}</p>}

            <InputSectionField>
              <Label htmlFor="birthdate" name="Data de nascimento" />
              <InputFocus>
                <Controller
                  name="birthdate"
                  control={control}
                  rules={{
                    validate: (value) => {
                      return isBirthdateValid(value) || "Data de nascimento inválida";
                    },
                  }}
                  render={({ field }) => (
                    <InputMask
                      mask="99/99/9999"
                      placeholder="DD/MM/AAAA"
                      {...field}
                      className={InputStyles.basicInputWithBorder}
                      id="birthdate"
                    />
                  )}
                />
              </InputFocus>
            </InputSectionField>
            {errors.birthdate && <p>{errors.birthdate?.message}</p>}

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
                <p>{errors.description?.message && errors.description?.message}</p>
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
                <p>{errors.address?.zip_code?.message && errors.address?.zip_code?.message}</p>
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
