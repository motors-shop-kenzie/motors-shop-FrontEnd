import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import { UserHeader } from "../UserHeader";
import { TCarProduct } from "@/interfaces/CarProduc";
import styles from "./styles.module.scss";

interface CardProps {
  car: TCarProduct;
}

export const ProductCard = ({ car }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {car.business && (
          <div className={styles.dollar}>
            <BiDollar />
          </div>
        )}
        <Image width={300} height={150} src={car.coverImg} alt="Car image" />
        <p className={styles.title}>{car.name}</p>
      </div>
      <div className={styles.desc}>{car.description}</div>
      <UserHeader
        user={car.user}
        index={car.user.id}
        letter={car.user.name.charAt(0)}
      />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
    </div>
  );
};
