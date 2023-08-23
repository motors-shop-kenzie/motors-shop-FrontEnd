import Image from "next/image";
import { UserHeader } from "../UserHeader";
import { TUser } from "@/interfaces/user";
import { TCarProduct } from "@/interfaces/CarProduc";
import { Button } from "../Button";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import ButtonStyled from "../Button/styles.module.scss";

interface CardProps {
  car: TCarProduct;
  user: TUser | undefined;
  isClickedUser?: boolean;
}

export const ProductSellerCard = ({ car, user, isClickedUser }: CardProps) => {
  const { push } = useRouter();
  const handleClick = () => {};
  const handleViewDetailsClick = () => {
    push(`/Product/${car.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {car.active ? <div className={styles.active}>Ativo</div> : <div className={styles.nonactive}>Inativo</div>}
        <div className={styles.divImg} onClick={handleViewDetailsClick}>
          <Image width={300} height={150} src={car.coverImg} alt="Car image" />
        </div>
        <p className={styles.title}>{car.model}</p>
      </div>
      <div className={styles.desc}>{car.description}</div>
      <UserHeader user={user} userId={user?.id} letter={user?.name?.charAt(0)} />
      <div className={styles.carInfo}>
        <div className={styles.info}>
          <div>{car.km} KM</div> <div>{car.year}</div>
        </div>
        <div className={styles.price}>R${car.price.toFixed(2)}</div>
      </div>
      {isClickedUser ? null : (
        <div className={styles.btns}>
          <Button className={ButtonStyled.grey10BorderGrey0Button} text="Editar" onClick={handleClick} />
          <Button
            className={ButtonStyled.grey10BorderGrey0Button}
            text="Ver detalhes"
            onClick={handleViewDetailsClick}
          />
        </div>
      )}
    </div>
  );
};
