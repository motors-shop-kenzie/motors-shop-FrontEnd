import { Car } from "@/components/CarFilter/interface";
import { Dispatch, SetStateAction } from "react";

export type ICarsContext = {
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
  filterData: Car[];
  setFilterData: Dispatch<SetStateAction<Car[]>>;
  getAllCarsRequest: () => void;
};
