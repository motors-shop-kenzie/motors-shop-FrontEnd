import { TUser, TUserLogin, TUserRegister } from "@/interfaces/user";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  registerUser: (data: TUserRegister) => void;
  loginUser: (data: TUserLogin) => void;
}
