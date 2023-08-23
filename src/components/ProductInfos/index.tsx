import { useContext } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";

import { Button } from "../Button";

import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";

export default function ProductInfos() {
  const { singleCar } = useContext(CarsContext);

  return (
    <div className={styles.carInfosDiv}>
      <h2>{singleCar?.model}</h2>
      <div>
        <div>
          <span>{singleCar?.year}</span>
          <span>{singleCar?.km} KM</span>
        </div>
        <p>R$ {singleCar?.price}</p>
      </div>
      <Button className={ButtonStyled.brand1Button} text="Comprar" type="button" />
    </div>
  );
}
