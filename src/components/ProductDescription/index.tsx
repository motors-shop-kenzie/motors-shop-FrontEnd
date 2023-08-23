import { CarsContext } from "@/contexts/Cars/CarsContext";
import styles from "./styles.module.scss";
import { useContext } from "react";

export default function ProductDescription() {
  const { singleCar } = useContext(CarsContext);
  return (
    <div className={styles.carDescriptionDiv}>
      <h2>Descrição</h2>
      <p>{singleCar?.description}</p>
    </div>
  );
}
