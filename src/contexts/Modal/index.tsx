"use client";

import { createContext, useState } from "react";
import { IModalContext } from "./interface";
import { iChildrenProps } from "@/interfaces";

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: iChildrenProps) => {
  const [showModal, setShowModal] = useState<string>("");

  const closeModal = () => {
    setShowModal("");
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
