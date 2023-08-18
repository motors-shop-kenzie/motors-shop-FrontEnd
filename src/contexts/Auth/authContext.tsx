/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { iChildrenProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { TUser, TUserLogin, TUserRegisterResquest } from "@/interfaces/user";
import { IAuthContext } from "./interface";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "@/services/api";
import { CarsContext } from "../Cars/CarsContext";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState<TUser | undefined>({} as TUser);
  const { getAllCarsRequest, getUserCars} = useContext(CarsContext)
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

  const logout = () => {
    const cookie = 'ccm.token';
    destroyCookie(null, cookie);
    router.push("/")
    window.location.reload();
  }


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

  useEffect(() =>  {
    getAllCarsRequest()
    getUserCars()
    loggedUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser,  loggedUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
