"use client";

import { iChildrenProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { TUser, TUserLogin, TUserRegisterResquest } from "@/interfaces/user";
import { IAuthContext } from "./interface";
import { parseCookies, setCookie } from "nookies";
import api from "@/services/api";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState<TUser | undefined>({} as TUser);
  // const [token, setToken] = useState<string | undefined>("");
  const router = useRouter();

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
        console.log(userData);
        setUser(userData);
        router.push("/login");
      })
      .catch((error) => console.error(error));
  };

  const loginUser = (data: TUserLogin) => {
    api
      .post(`/login`, data)
      .then((response) => {
        setCookie(null, "ccm.token", response.data.token, {
          maxAge: 60 * 40,
          path: "/",
        }),
          
        router.push("/");
      })
      .catch((error) => console.error(error));
  };

  const autoLogin = async () => {
    if (token) {
      try {
        const response = await api.get("/users", {
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
    autoLogin();
    loggedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
