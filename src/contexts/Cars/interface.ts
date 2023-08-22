import { Car } from "@/interfaces/CarFilter";
import { Dispatch, SetStateAction } from "react";

export type ICarsContext = {
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
  userCars: Car[];
  setUserCars: Dispatch<SetStateAction<Car[]>>;
  filterData: Car[];
  setFilterData: Dispatch<SetStateAction<Car[]>>;
  getAllCarsRequest: () => void;
  getUserCars: () => void;
  createCars: (formData: Car) => Promise<void>;
  getSingleCar: (id: string) => Promise<void>;
  singleCar: Car | undefined;
  setSingleCar: Dispatch<SetStateAction<Car | undefined>>;
};
