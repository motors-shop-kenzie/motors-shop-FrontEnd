import { RegisterData } from "@/components/Forms/Register/validator";
import { SetStateAction } from "react";
import { Dispatch } from "react";

export type IUserContext = {
  user?: RegisterData;
  /*   setUser: Dispatch<SetStateAction<RegisterData>>;
   */ registerUser: (data: RegisterData) => void;
  getUser: () => void;
};
