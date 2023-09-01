import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useModal } from "@/hooks/modalHook";
import { TCarProduct } from "@/interfaces/CarProduc";
import { TUser } from "@/interfaces/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { Button } from "../Button";
import ButtonStyled from "../Button/styles.module.scss";
import { UserHeader } from "../UserHeader";
import styles from "./styles.module.scss";

interface CardProps {
  car: TCarProduct;
  user: TUser | undefined;
  isClickedUser?: boolean;
}

export const ProductSellerCard = ({ car, user, isClickedUser }: CardProps) => {
  const { setSelectedCar, singleCar, setSingleCar } = useContext(CarsContext);
  const { push } = useRouter();
  const { setShowModal } = useModal();

  const viewedCar = useMemo(() => (car === singleCar ? singleCar : car), [singleCar, car]);

  const handleClick = () => {
    setSelectedCar(car.id);
    setSingleCar(viewedCar);
    setShowModal("editCar");
  };

  const handleViewDetailsClick = () => {
    push(`/Product/${car.id}`);
  };

  return (
    <div onClick={handleViewDetailsClick} className={styles.card}>
      <div className={styles.img}>
        {car.active ? <div className={styles.active}>Ativo</div> : <div className={styles.nonactive}>Inativo</div>}
        <div>
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
        <div className={styles.price}>{car?.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
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
