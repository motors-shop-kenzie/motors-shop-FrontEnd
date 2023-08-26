import { iComment } from "@/components/Forms/CreateComment";
import { Car } from "@/interfaces/CarFilter";
import { TCarsPayloadRequest } from "@/interfaces/CarProduc";
import { Dispatch, SetStateAction } from "react";

export type ICarsContext = {
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
  userCars: Car[];
  setUserCars: Dispatch<SetStateAction<Car[]>>;
  filterData: Car[];
  setFilterData: Dispatch<SetStateAction<Car[]>>;
  getAllCarsRequest: () => Promise<void>;
  getUserCars: () => Promise<void>;
  createCars: (formData: TCarsPayloadRequest) => Promise<void>;
  getSingleCar: (id: string) => Promise<void>;
  singleCar: Car | undefined;
  setSingleCar: Dispatch<SetStateAction<Car | undefined>>;
  getComment: (carId: string) => Promise<void>;
  setComment: Dispatch<SetStateAction<iComment[]>>;
  comment: iComment[];
};
