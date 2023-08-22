/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { iChildrenProps } from "@/interfaces";
import { createContext, useEffect, useState } from "react";
import { ICarsContext } from "./interface";
import { Car } from "@/interfaces/CarFilter";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { TCarsRegister } from "@/schemas/carSchema";
import Toast from "@/components/Toast";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [filterData, setFilterData] = useState<Car[]>([]);
  const [singleCar, setSingleCar] = useState<Car | undefined>({} as Car);

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const createCars = async (formData: TCarsRegister) => {
    try {
      const response = await api.post("/cars", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars(response.data);
      Toast({ message: "Anúncio criado com sucesso !", isSucess: true });
      await getAllCarsRequest();
      await getUserCars();
    } catch (error) {
      console.error(error);
      Toast({ message: "Tente novamente" });
    }
  };

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
        const response = await api.get("/cars/logged");
        const data = response.data;
        setUserCars(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getSingleCar = async (id: string) => {
      try {
        const response = await api.get(`/cars/${id}`);
        const data = response.data;
        setSingleCar(data);
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
    (async () => {
      api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
      await getAllCarsRequest();
      await getUserCars();
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
        createCars,
        getSingleCar,
        singleCar,
        setSingleCar,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
