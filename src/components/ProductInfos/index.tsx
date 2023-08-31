import { useContext } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";

import { Button } from "../Button";
import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";
import { ICreateWhatsAppMessageProps, IOpenWhatsApp } from "./interfaces";
import { AuthContext } from "@/contexts/Auth/authContext";

function createWhatsAppMessage({ userName, vehicleInfo }: ICreateWhatsAppMessageProps) {
  const message = `Olá, me chamo: ${userName}. Vi pelo seu anúncio no site Motors Shop e gostaria de comprar o veículo: ${vehicleInfo.brand}, ano: ${vehicleInfo.year}, modelo: ${vehicleInfo.model}, cor: ${vehicleInfo.color}.`;
  return encodeURIComponent(message);
}

function openWhatsApp({ singleCar, message }: IOpenWhatsApp) {
  window.open(`https://api.whatsapp.com/send?phone=+55${singleCar?.user.telephone}&text=${message}`, "_blank");
}

export default function ProductInfos() {
  const { singleCar } = useContext(CarsContext);
  const { user } = useContext(AuthContext);

  const isUserLoggedIn = user && Object.keys(user).length > 0;

  const handleBuyClick = () => {
    if (isUserLoggedIn) {
      const userName = singleCar!.user.name;
      const vehicleInfo = {
        brand: singleCar!.brand,
        year: singleCar!.year,
        model: singleCar!.model,
        color: singleCar!.color,
      };

      const message = createWhatsAppMessage({ userName, vehicleInfo });
      openWhatsApp({ singleCar: singleCar, message: message });
    }
  };

  return (
    <div className={styles.carInfosDiv}>
      <h2>{singleCar?.model}</h2>
      <div>
        <div>
          <span>{singleCar?.year}</span>
          <span>{singleCar?.km} KM</span>
        </div>
        <p>{singleCar?.price?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      </div>
      <Button
        className={isUserLoggedIn ? ButtonStyled.brand1Button : ButtonStyled.grey8TextGrey0Button}
        text={isUserLoggedIn ? "Comprar" : "Faça login para comprar"}
        type="button"
        onClick={handleBuyClick}
        disable={!isUserLoggedIn}
      />
    </div>
  );
}
