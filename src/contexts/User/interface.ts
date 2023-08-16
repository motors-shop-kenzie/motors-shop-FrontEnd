import { SetStateAction } from "react";
import { Dispatch } from "react";

export type IUserContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export type User = {
  name: string;
  email: string;
  password: string;
  cpf: number;
  isAdmin: boolean;
  telephone: number;
  description: string;
  birthdate: Date;
};
