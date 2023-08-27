/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Toast from "@/components/Toast";
import { useRequest } from "@/hooks/useRequest";
import { iChildrenProps } from "@/interfaces";
import { Car } from "@/interfaces/CarFilter";
import { TCarsPayloadRequest } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import { ICarsContext } from "./interface";
import { iComment } from "@/components/Forms/CreateComment";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [filterData, setFilterData] = useState<Car[]>([]);
  const [singleCar, setSingleCar] = useState<Car | undefined>({} as Car);
  const [comment, setComment] = useState<iComment[]>([]);

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const request = useRequest();

  const createCars = async (formData: TCarsPayloadRequest) => {
    await request({
      tryFn: async () => {
        const response = await api.post<Car>("/cars", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars((prev) => [...prev, response.data]);
        Toast({ message: "Anúncio criado com sucesso !", isSucess: true });
        await getAllCarsRequest();
        await getUserCars();
      },
      onErrorFn: () => Toast({ message: "Tente novamente" }),
    });
  };

  const getAllCarsRequest = async () => {
    await request({
      tryFn: async () => {
        const response = await api.get("/cars");
        const data = response.data;
        setCars(data);
      },
      onErrorFn: () => Toast({ message: "Não foi possível carregar todos os carros" }),
    });
  };

  const getUserCars = async () => {
    if (token) {
      await request({
        tryFn: async () => {
          const response = await api.get("/cars/logged");
          const data = response.data;
          setUserCars(data);
        },
        onErrorFn: () => Toast({ message: "Não foi possível carregar seus carros" }),
      });
    }
  };

  const getSingleCar = async (id: string) => {
    await request({
      tryFn: async () => {
        const response = await api.get(`/cars/${id}`);
        const data = response.data;
        setSingleCar(data);
      },
      onErrorFn: () => Toast({ message: "Não foi possível carregar as informações deste carro" }),
    });
  };

  const getComment = async (carId: string) => {
    await request({
      tryFn: async () => {
        const res = await api.get(`/comments/${carId}`);
        const commentData = res.data;
        setComment(commentData);
      },
    });
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
        getComment,
        comment,
        setComment,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
