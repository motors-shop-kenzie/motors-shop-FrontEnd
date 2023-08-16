import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import styles from "./styles.module.scss";
import { UserHeader } from "../UserHeader";
import { TUser } from "@/interfaces/user";
import { TCarProduct } from "@/interfaces/CarProduc";

interface CardProps {
  car: TCarProduct;
  user: TUser | undefined;
}

export const ProductCard = ({ car, user }: CardProps) => {
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
      <UserHeader user={user} index={user?.id} letter={user?.name?.charAt(0)} />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
    </div>
  );
};
