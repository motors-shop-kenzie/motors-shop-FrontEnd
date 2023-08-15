"use client";

import { iChildrenProps } from "@/interfaces";
import { createContext, useEffect, useState } from "react";
import { Car, FilterOptions } from "@/components/CarFilter/interface";
import { ICarsContext } from "./interface";
import api from "@/services/api";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filterData, setFilterData] = useState<Car[]>([]);

  const getAllCarsRequest = async () => {
    try {
      const response = await api.get("/cars");
      const data = response.data;

      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllCarsRequest();
    })();
  }, []);

  return (
    <CarsContext.Provider
      value={{
        cars,
        setCars,
        getAllCarsRequest,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
