import {
  TUser,
  TUserLogin,
  TUserRegister,
  TUserRegisterResquest,
} from "@/interfaces/user";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  registerUser: (data: TUserRegisterResquest) => void;
  loginUser: (data: TUserLogin) => void;
}
