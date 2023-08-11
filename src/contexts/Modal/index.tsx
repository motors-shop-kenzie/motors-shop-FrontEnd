"use client";

import { createContext, useState } from "react";
import { IModalContext, IProviderChildrenProps } from "./interface";

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: IProviderChildrenProps) => {
  const [showModal, setShowModal] = useState("");

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
