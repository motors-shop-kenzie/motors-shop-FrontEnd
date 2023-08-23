import profileDefault from "@/assets/defaults/profile.svg";

import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "../Button";

import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";
import { TUser } from "@/interfaces/user";

interface iUserInfosProps {
  name: string;
  description?: string;
}

export default function ProfileUserInfos({ name, description }: iUserInfosProps) {
  // const { singleCar } = useContext(CarsContext);

  return (
    <div className={styles.profileUserInfosDiv}>
      <figure>
        <Image src={profileDefault} alt="" />
      </figure>
      <h2>{name}</h2>
      <p>{description}</p>
      <Button className={ButtonStyled.grey1Button} text="Ver todos os anuncios" type="button" />
    </div>
  );
}
