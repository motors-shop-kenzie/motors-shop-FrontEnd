import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import styles from "./styles.module.scss";
import { UserHeader } from "../UserHeader";
import { TUser } from "@/interfaces/user";
import { TCarProduct } from "@/interfaces/CarProduc";

interface CardProps {
  car: TCarProduct;
<<<<<<< HEAD
  user: TUser;
}

export const ProductCard = ({ car, user }: CardProps) => {
  // console.log(user.name[0])
=======
  user: TUser | undefined;
}

export const ProductCard = ({ car, user }: CardProps) => {
>>>>>>> 18a6fa3e494b53cbf558e265fc3dae30bec5f71b
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
<<<<<<< HEAD
      <UserHeader user={user.name} index={user.id} letter={user.name[0]} />
=======
      <UserHeader user={user} index={user?.id} letter={user?.name?.charAt(0)} />
>>>>>>> 18a6fa3e494b53cbf558e265fc3dae30bec5f71b
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
    </div>
  );
};
