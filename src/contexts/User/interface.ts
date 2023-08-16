import { SetStateAction } from "react";
import { Dispatch } from "react";
import { TUser, TUserLogin, TUserRegister } from "@/interfaces/user";

export type IUserContext = {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  registerUser: (data: TUserRegister) => void;
  loginUser: (data: TUserLogin) => void;
  getUser: () => void;
};
