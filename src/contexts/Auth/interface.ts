import { TUser, TUserLogin, TUserRegisterResquest } from "@/interfaces/user";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  registerUser: (data: TUserRegisterResquest) => void;
  loginUser: (data: TUserLogin) => void;
  logout: () => void;
  autoLogin: () => Promise<void>;
  loggedUser: () => Promise<void>;
}
