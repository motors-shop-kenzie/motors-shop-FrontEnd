/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { iChildrenProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ResetPasswordData,
  SendEmailResetPasswordData,
  TUser,
  TUserLogin,
  TUserRegisterResquest,
} from "@/interfaces/user";
import { IAuthContext } from "./interface";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "@/services/api";
import { CarsContext } from "../Cars/CarsContext";
import Toast from "@/components/Toast";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState<TUser | undefined>({} as TUser);
  const { getAllCarsRequest, getUserCars } = useContext(CarsContext);
  const { push } = useRouter();

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const registerUser = (data: TUserRegisterResquest) => {
    api
      .post(`/users`, data)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
        Toast({ message: "Cadastro efetuado com sucesso !", isSucess: true });
        push("/login");
      })
      .catch((error) => {
        console.error(error), Toast(error);
      });
  };

  const loginUser = (data: TUserLogin) => {
    api
      .post(`/login`, data)
      .then((response) => {
        setCookie(null, "ccm.token", response.data.token, {
          maxAge: 60 * 240,
          path: "/",
        }),
          Toast({ message: "Login efetuado com sucesso !", isSucess: true });
        push("/");
      })
      .catch((error) => {
        console.error(error), Toast(error);
      });
  };

  const logout = () => {
    const cookie = "ccm.token";
    destroyCookie(null, cookie);
    push("/");
    window.location.reload();
  };

  const loggedUser = async () => {
    if (token) {
      try {
        const response = await api.get("/users/logged", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllCarsRequest();
    getUserCars();
    loggedUser();
  }, [token]);

  const sendEmail = (sendEmailResetPasswordData: SendEmailResetPasswordData) => {
    api
      .post("/users/resetPassword", sendEmailResetPasswordData)
      .then(() => {
        /*         Toast({ message: "E-mail enviado com sucesso !", isSucess: true });
        push("/"); */
      })
      .catch((err) => {
        console.error(err);
        /*   Toast({ message: "Erro ao enviar o e-mail, tente novamente mais tarde" }); */
      });
  };

  const resetPassword = (resetPasswordData: ResetPasswordData, token: string) => {
    api
      .patch(`/users/resetPassword/${token}`, { password: resetPasswordData.password })
      .then(() => {
        /*         Toast({ message: "Senha atualizada sucesso !", isSucess: true });
        push("/login"); */
      })
      .catch((err) => {
        console.error(err);
        /*         Toast({ message: "Erro ao atualizar a senha" });
         */
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser, loggedUser, logout, sendEmail, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
