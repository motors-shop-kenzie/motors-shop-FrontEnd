import profileDefault from "@/assets/defaults/profile.svg";

import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "../Button";

import ButtonStyled from "../Button/styles.module.scss";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface iUserInfosProps {
  userId: string;
  name: string;
  description?: string;
}

export default function ProfileUserInfos({ userId, name, description }: iUserInfosProps) {
  const { push } = useRouter();
  const redirect = () => {
    push(`/checkSellerPage/${userId}`);
  };

  return (
    <div className={styles.profileUserInfosDiv}>
      <figure>
        <Image src={profileDefault} alt="" />
      </figure>
      <h2>{name}</h2>
      <p>{description}</p>
      <Button
        className={ButtonStyled.grey1Button}
        onClick={() => redirect()}
        text="Ver todos os anúncios"
        type="button"
      />
    </div>
  );
}
