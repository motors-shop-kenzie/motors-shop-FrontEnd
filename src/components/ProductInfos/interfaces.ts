import { TCarProduct } from "@/interfaces/CarProduc";

export interface IVehicleInfo {
  brand: string;
  year: number;
  model: string;
  color: string;
}

export interface IOpenWhatsApp {
  singleCar: TCarProduct | undefined;
  message: string;
}

export interface ICreateWhatsAppMessageProps {
  userName: string;
  vehicleInfo: IVehicleInfo;
}
