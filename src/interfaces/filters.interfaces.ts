import { ReactNode } from "react";

export interface IDefaultProps {
  children: ReactNode;
}

export interface IDefaultPageProps {
  current: number;
  last: number;
  next: number;
  prev: number;
  filter?: string;
  filterName?: string | number;
  filterMin?: string;
  filterMax?: string;
  filterValueMin?: number;
  filterValueMax?: number;
}

interface IImgs {
  id: string;
  url_img: string;
  carProductsId: string;
}

export interface ICars {
  id: string;
  name: string;
  coverImg: string;
  price: number;
  year: number;
  km: number;
  description: string;
  color: string;
  model: string;
  brand: string;
  gasoline: ["FLEX", "HIBRID", "ELECTRIC"];
  tablePife: number;
  business: boolean;
  img: IImgs[];
}

export interface IPropsFilter {
  filter(
    arg0: (event: any) => boolean
  ): import("react").SetStateAction<never[]>;
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
  data: ICars[];
}
