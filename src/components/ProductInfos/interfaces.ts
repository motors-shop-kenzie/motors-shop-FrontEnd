import { Car } from "@/interfaces/CarFilter";

export interface IVehicleInfo {
  brand: string;
  year: number;
  model: string;
  color: string;
}

export interface IOpenWhatsApp {
  singleCar: Car | undefined;
  message: string;
}

export interface ICreateWhatsAppMessageProps {
  userName: string;
  vehicleInfo: IVehicleInfo;
}
