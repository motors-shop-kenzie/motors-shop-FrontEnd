import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import { UserHeader } from "../UserHeader";
import { TCarProduct } from "@/interfaces/CarProduc";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface CardProps {
  car: TCarProduct;
}

export const ProductCard = ({ car }: CardProps) => {
  const { push } = useRouter();
  const redirect = () => {
    push(`/Product/${car.id}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {car.business && (
          <div className={styles.dollar}>
            <BiDollar />
          </div>
        )}
        <div onClick={() => redirect()}>
          <Image width={300} height={150} src={car.coverImg} style={{ cursor: "pointer" }} alt="Car image" />
          <p className={styles.title}>{car.model}</p>
          <div className={styles.desc}>{car.description}</div>
        </div>
      </div>

      <UserHeader user={car.user} letter={car.user.name.charAt(0)} userId={car.userId} />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
    </div>
  );
};
