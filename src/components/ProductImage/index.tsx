/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";

import styles from "./styles.module.scss";
import Image from "next/image";

export default function ProductCoverImage() {
  const { singleCar } = useContext(CarsContext);
  return (
    <figure className={styles.coverFigure}>
      <img src={singleCar!.coverImg} alt="" />
    </figure>
  );
}
