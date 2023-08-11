import React, { Dispatch } from "react";
import { SetStateAction } from "react";

export interface IProviderChildrenProps {
  children: React.ReactNode;
}

export type IModalContext = {
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
};
