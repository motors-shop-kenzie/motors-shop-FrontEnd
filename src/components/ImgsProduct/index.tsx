import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useContext, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { ModalContext } from "@/contexts/Modal";
import { Modal } from "../Modal";


export default function ImgsProduct() {
  const { singleCar } = useContext(CarsContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [img, setImg] = useState("")
  const openFigure = (img:string) => {
    setShowModal("img")
    setImg(img)
    
  };
  

  return (
    <>
      {showModal == "img" ? (
        <Modal title="Imagem do Veículo" >
          <Image src={img} alt="car image" height={150} width={300} />
        </Modal>
      ) : null}
      <div className={styles.box}>
        <h2>Fotos</h2>
        <ul className={styles.imgBox}>
          {singleCar!.img
            ? singleCar?.img.map((img) => (
                <li key={img.id} onClick={() => openFigure(img.url_img)}>
                  <Image src={img.url_img} alt="car image" height={100} width={100} />
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}
