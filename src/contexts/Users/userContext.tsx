/* eslint-disable react-hooks/exhaustive-deps */

import { iChildrenProps } from "@/interfaces";
import { createContext, useContext, useEffect } from "react";
import { TUserUpdate } from "@/interfaces/user";
import { IUserContext } from "./interface";
import { parseCookies } from "nookies";
import api from "@/services/api";
import Toast from "@/components/Toast";
import { TAddressUpdate } from "@/interfaces/address";
import { useRequest } from "@/hooks/useRequest";
import { AuthContext } from "../Auth/authContext";

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: iChildrenProps) => {
  const { loggedUser, logout, user, setUser } = useContext(AuthContext);

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const request = useRequest();

  const patchUser = async (data: TUserUpdate) => {
    await request({
      tryFn: async () => {
        await api.patch(`users/${user?.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Toast({ message: "Informações atualizadas com sucesso!", isSucess: true });
        window.location.reload();
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar suas informações" }),
    });
  };

  const destroyUser = async () => {
    await request({
      tryFn: async () => {
        await api.delete(`users/${user!.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Toast({ message: "Usuário deletado com sucesso!", isSucess: true });
        logout();
      },
      onErrorFn: () => Toast({ message: "Não foi possível deletar suas informações" }),
    });
  };

  const editUserAddress = async (data: TAddressUpdate) => {
    await request({
      tryFn: async () => {
        await api.patch(`addresses/${user?.address.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Toast({ message: "Endereço atualizado com sucesso!", isSucess: true });

        loggedUser();
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar o endereço" }),
    });
  };

  return (
    <UserContext.Provider
      value={{
        patchUser,
        destroyUser,
        editUserAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
