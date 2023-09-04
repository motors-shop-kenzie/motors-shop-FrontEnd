"use client";

import { createContext, useState } from "react";
import { iChildrenProps } from "@/interfaces";
import { ILoadingContext } from "./interface";

export const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export const LoadingProvider = ({ children }: iChildrenProps) => {
  const [loading, setLoading] = useState(true);

  return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};
