"use client";
import { useState } from "react";
import { createContext } from "react";
import api from "@/services/api";
import {
  IDefaultPageProps,
  IDefaultProps,
  IPropsFilter,
} from "@/interfaces/filters.interfaces";

export const FiltersContext = createContext({} as any);

export const FilterProvider = ({ children }: IDefaultProps) => {
  const [page, setPage] = useState<IDefaultPageProps>();
  const [minKm, setMinKm] = useState<number>(0);
  const [maxKm, setMaxKm] = useState<number>(1000000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [currentCar, setCurrentCar] = useState([]);

  const retrieveFilterByKmPriceAdvert = async (
    type: "KM" | "Price",
    value: string,
    setState: string
  ) => {
    const newValue = Number(value);
    try {
      const filterMin = type == "KM" ? "minKM" : "minPrice";
      const filterMax = type == "KM" ? "maxKM" : "maxPrice";
      let filterValueMin = type == "KM" ? minKm : minPrice;
      let filterValueMax = type == "KM" ? maxKm : maxPrice;
      if (type == "KM" && setState == "min") {
        setMinKm(newValue);
        filterValueMin = newValue;
      }
      if (type == "Price" && setState == "min") {
        setMinPrice(newValue);
        filterValueMin = newValue;
      }
      event;
      if (type == "KM" && setState == "max") {
        setMaxKm(newValue);
        filterValueMax = newValue;
      }
      if (type == "Price" && setState == "max") {
        setMaxPrice(newValue);
        filterValueMax = newValue;
      }
      const request = await api.get(
        `/cars/pagination?page=${page}&${filterMin}=${filterValueMin}&${filterMax}=${filterValueMax}`
      );
      const response: IPropsFilter = request.data;

      setCurrentCar(response.filter((event: any) => event.is_active == true));
      setPage({
        current: response.currentPage,
        last: response.lastPage,
        next: response.next,
        prev: response.prev,
        filterMin: filterMin,
        filterValueMin: filterValueMin,
        filterMax: filterMax,
        filterValueMax: filterValueMax,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FiltersContext.Provider
      value={{ currentCar, retrieveFilterByKmPriceAdvert }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
