import { CarData } from "@/schemas/carSchema";
import Image from "next/image";
import { BiDollar } from "react-icons/bi";

interface CardProps {
  car: CarData;
}

const ProductCard = ({ car }: CardProps) => {
  return (
    <div>
      <div className="img">
        <BiDollar className="dollar" />
        <Image width={300} height={150} src={car.coverImg} alt="Car image" />
        img nome
        <p className="title">{car.name}</p>
      </div>
      <div className="desc">{car.description}</div>
      <div className="userInfo">
        <div className="circle">PL</div>
        <div className="userName">Nome</div>
      </div>
      <div className="carInfo">
        <div className="info">
          <span>{car.km} KM</span> <span>{car.year}</span>
        </div>
        <div className="price">preço</div>
      </div>
    </div>
  );
};

export default ProductCard;
