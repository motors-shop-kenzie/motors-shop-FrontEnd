import Image from "next/image";
import { BiDollar } from "react-icons/bi";
import UserHeader from "../UserHeader";
import styles from "./styles.module.scss";
import { TCarProduct } from "@/interfaces/CarProduc";

interface CardProps {
  car: TCarProduct;
}

const ProductCard = ({ car }: CardProps) => {
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
      <UserHeader />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
