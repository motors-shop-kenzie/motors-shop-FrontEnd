import profileDefault from "@/assets/defaults/profile.svg";

import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "../Button";

import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";

export default function ProfileUserInfos() {
  const { singleCar } = useContext(CarsContext);

  return (
    <div className={styles.profileUserInfosDiv}>
      <figure>
        <Image src={profileDefault} alt="" />
      </figure>
      <h2>{singleCar?.user.name}</h2>
      <p>{singleCar?.user.description}</p>
      <Button className={ButtonStyled.grey1Button} text="Ver todos os anuncios" type="button" />
    </div>
  );
}
