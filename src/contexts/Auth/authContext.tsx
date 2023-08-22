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
  TUserUpdate,
} from "@/interfaces/user";
import { IAuthContext } from "./interface";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "@/services/api";
import { CarsContext } from "../Cars/CarsContext";
import Toast from "@/components/Toast";

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
        Toast({ message: "E-mail enviado com sucesso !", isSucess: true });
        push("/");
      })
      .catch((err) => {
        console.error(err);
        Toast({ message: "Erro ao enviar o e-mail, tente novamente mais tarde" });
      });
  };

  const resetPassword = (resetPasswordData: ResetPasswordData, token: string) => {
    api
      .patch(`/users/resetPassword/${token}`, { password: resetPasswordData.password })
      .then(() => {
        Toast({ message: "Senha atualizada sucesso !", isSucess: true });
        push("/login");
      })
      .catch((err) => {
        console.error(err);
        Toast({ message: "Erro ao atualizar a senha" });
      });
  };

  const patchUser = async (data: TUserUpdate) => {
    await api
      .patch(`users/${user?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.error(error));
  };

  const destroyUser = async () => {
    await api
      .delete(`users/${user!.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        logout();
      })
      .catch((error) => console.error(error));
  };

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
        patchUser,
        destroyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
