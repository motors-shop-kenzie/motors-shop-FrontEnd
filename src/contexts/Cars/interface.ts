import { iComment } from "@/components/Forms/CreateComment";
import { TCarProduct, TCarUpdate, TCarsPayloadRequest } from "@/interfaces/CarProduc";
import { Dispatch, SetStateAction } from "react";

export type ICarsContext = {
  cars: TCarProduct[];
  setCars: Dispatch<SetStateAction<TCarProduct[]>>;
  userCars: TCarProduct[];
  setUserCars: Dispatch<SetStateAction<TCarProduct[]>>;
  filterData: TCarProduct[];
  setFilterData: Dispatch<SetStateAction<TCarProduct[]>>;
  getAllCarsRequest: () => Promise<void>;
  getUserCars: () => Promise<void>;
  createCars: (formData: TCarsPayloadRequest) => Promise<void>;
  getSingleCar: (id: string) => Promise<void>;
  singleCar: TCarProduct | undefined;
  setSingleCar: Dispatch<SetStateAction<TCarProduct | undefined>>;
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
  patchCar: (data: TCarUpdate) => Promise<void>;
  destroyCar: () => Promise<void>;
  selectedCar: string;
  setSelectedCar: Dispatch<SetStateAction<string>>;
};

export type TPaginationValue = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
  data: TCarProduct[];
};
