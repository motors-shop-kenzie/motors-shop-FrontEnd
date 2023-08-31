import { useContext } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";

import { Button } from "../Button";
import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";
import { ICreateWhatsAppMessageProps, IOpenWhatsApp } from "./interfaces";

function createWhatsAppMessage({ userName, vehicleInfo }: ICreateWhatsAppMessageProps) {
  const message = `Olá, me chamo: ${userName}. Vi pelo seu anúncio no site Motors Shop e gostaria de comprar o veículo: ${vehicleInfo.brand}, ano: ${vehicleInfo.year}, modelo: ${vehicleInfo.model}, cor: ${vehicleInfo.color}.`;
  return encodeURIComponent(message);
}

function openWhatsApp({ singleCar, message }: IOpenWhatsApp) {
  window.open(`https://api.whatsapp.com/send?phone=+55${singleCar?.user.telephone}&text=${message}`, "_blank");
}

export default function ProductInfos() {
  const { singleCar } = useContext(CarsContext);

  const handleBuyClick = () => {
    const userName = singleCar!.user.name;
    const vehicleInfo = {
      brand: singleCar!.brand,
      year: singleCar!.year,
      model: singleCar!.model,
      color: singleCar!.color,
    };

    const message = createWhatsAppMessage({ userName, vehicleInfo });
    openWhatsApp({ singleCar: singleCar, message: message });
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
      <Button className={ButtonStyled.brand1Button} text="Comprar" type="button" onClick={handleBuyClick} />
    </div>
  );
}
