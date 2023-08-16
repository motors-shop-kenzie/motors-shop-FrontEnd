"use client";

import { iChildrenProps } from "@/interfaces";
import { createContext, useState } from "react";
import api from "@/services/api";
import { IUserContext, User } from "./interface";

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: iChildrenProps) => {
  const [user, setUser] = useState({});

  const registerUser = (data: User) => {
    api
      .post(`/users`, data)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = (data: User) => {
    api
      .post(`/users`, data)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = () => {
    api
      .get(`/users`)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
