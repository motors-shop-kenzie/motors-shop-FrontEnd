"use client";

import { iChildrenProps } from "@/interfaces";
import { createContext, useEffect, useState } from "react";
import { ICarsContext } from "./interface";
import { Car } from "@/interfaces/CarFilter";
import api from "@/services/api";
import { parseCookies } from "nookies";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [filterData, setFilterData] = useState<Car[]>([]);

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const getAllCarsRequest = async () => {
    try {
      const response = await api.get("/cars");
      const data = response.data;

      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserCars = async () => {
    if (token) {
      try {
        const response = await api.get("/cars");
        const data = response.data;
        console.log("DATA DE USERCARS", data);
        setUserCars(data);
      } catch (error) {
        console.error(error);
      }
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
        userCars,
        setUserCars,
        getAllCarsRequest,
        getUserCars,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
