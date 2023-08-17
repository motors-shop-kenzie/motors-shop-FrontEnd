import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import styles from "./styles.module.scss";
import { UserHeader } from "../UserHeader";
import { TUser } from "@/interfaces/user";
import { TCarProduct } from "@/interfaces/CarProduc";
import { Button } from "../Button";

interface CardProps {
  car: TCarProduct;
  user: TUser | undefined;
}

export const ProductSellerCard = ({ car, user }: CardProps) => {

  const handleClick = () => {
    console.log("click funcionando");
  };


  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {car.active ? (
          <div className={styles.active}>Ativo</div>
        ) : (
          <div className={styles.nonactive}>Inativo</div>
        )}
        <Image width={300} height={150} src={car.coverImg} alt="Car image" />
        <p className={styles.title}>{car.name}</p>
      </div>
      <div className={styles.desc}>{car.description}</div>
      <UserHeader user={user} index={user?.id} letter={user?.name?.charAt(0)} />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.grey10BorderGrey0Button}
          text="Editar"
          onClick={handleClick}
        />
        <Button
          className={styles.grey10BorderGrey0Button}
          text="Ver detalhes"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
