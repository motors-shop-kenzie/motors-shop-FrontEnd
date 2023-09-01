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
import { useRequest } from "@/hooks/useRequest";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState<TUser | undefined>({} as TUser);

  const [openNavBar, setOpenNavBar] = useState<boolean>(false);
  const toggleNavBar = () => setOpenNavBar(!openNavBar);
  const closeNavBar = () => setOpenNavBar(false);

  const { getAllCarsRequest, getUserCars } = useContext(CarsContext);
  const { push } = useRouter();

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const request = useRequest();

  const registerUser = async (data: TUserRegisterResquest) => {
    await request({
      tryFn: async () => {
        const res = await api.post(`/users`, data);
        const userData = res.data;
        setUser(userData);

        Toast({ message: "Cadastro efetuado com sucesso!", isSucess: true });
        push("/login");
      },
      onErrorFn: () => Toast({ message: "Cadastro não pode ser efetuado" }),
    });
  };

  const loginUser = async (data: TUserLogin) => {
    await request({
      tryFn: async () => {
        const response = await api.post(`/login`, data);

        setCookie(null, "ccm.token", response.data.token, {
          maxAge: 60 * 240,
          path: "/",
        });
        push("/");
      },
      onErrorFn: () => Toast({ message: "Login não pode ser efetuado" }),
    });
  };

  const logout = () => {
    destroyCookie(null, "ccm.token");
    destroyCookie(null, "ccm.isAdmin");
    push("/");
    window.location.reload();
  };

  const loggedUser = async () => {
    if (token) {
      await request({
        tryFn: async () => {
          const response = await api.get("/users/logged", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(response.data);

          setCookie(null, "ccm.isAdmin", response.data.isAdmin);
        },
        onErrorFn: () => Toast({ message: "Erro inesperado" }),
      });
    }
  };

  const sendEmail = async (sendEmailResetPasswordData: SendEmailResetPasswordData) => {
    await request({
      tryFn: async () => {
        await api.post("/users/resetPassword", sendEmailResetPasswordData);

        Toast({ message: "E-mail enviado com sucesso!", isSucess: true });
        push("/");
      },
      onErrorFn: () => Toast({ message: "Erro ao enviar o e-mail, tente novamente mais tarde" }),
    });
  };

  const resetPassword = async (resetPasswordData: ResetPasswordData, token: string) => {
    await request({
      tryFn: async () => {
        await api.patch(`/users/resetPassword/${token}`, { password: resetPasswordData.password });

        Toast({ message: "Senha atualizada com sucesso!", isSucess: true });
        push("/login");
      },
      onErrorFn: () => Toast({ message: "Erro ao atualizar a senha" }),
    });
  };

  useEffect(() => {
    getAllCarsRequest();
    getUserCars();
    loggedUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        loggedUser,
        logout,
        sendEmail,
        resetPassword,
        openNavBar,
        setOpenNavBar,
        toggleNavBar,
        closeNavBar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
