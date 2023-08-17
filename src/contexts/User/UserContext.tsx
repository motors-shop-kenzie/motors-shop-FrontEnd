"use client";

import { iChildrenProps } from "@/interfaces";
import { createContext, useEffect, useState } from "react";
import { IUserContext } from "./interface";
import { TUser, TUserLogin, TUserRegister } from "@/interfaces/user";
import api from "@/services/api";

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState<TUser | undefined>();

  const registerUser = (data: TUserRegister) => {
    api
      .post(`/users`, data)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => console.error(error));
  };

  const loginUser = (data: TUserLogin) => {
    api
      .post(`/login`, data)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => console.error(error));
  };

  const getUser = () => {
    api
      .get(`/users`)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
