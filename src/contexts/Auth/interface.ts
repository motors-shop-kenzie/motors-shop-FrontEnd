import {
  ResetPasswordData,
  SendEmailResetPasswordData,
  TUser,
  TUserLogin,
  TUserRegisterResquest,
} from "@/interfaces/user";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  registerUser: (data: TUserRegisterResquest) => void;
  loginUser: (data: TUserLogin) => void;
  logout: () => void;
  loggedUser: () => Promise<void>;
  sendEmail: (sendEmailResetPasswordData: SendEmailResetPasswordData) => void;
  resetPassword: (resetPasswordData: ResetPasswordData, token: string) => void;
}
