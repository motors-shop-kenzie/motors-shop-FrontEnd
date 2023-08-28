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
  comment: iComment[];
  setComment: Dispatch<SetStateAction<iComment[]>>;
  patchComment: (data: string, commentId: string) => Promise<void>;
  editingCommentId: string | null;
  setEditingCommentId: Dispatch<SetStateAction<string | null>>;
  deleteComment: (commentId: string) => Promise<void>;
  pageValues: TPaginationValue;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
};

export type TPaginationValue = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
  data: Car[];
};
