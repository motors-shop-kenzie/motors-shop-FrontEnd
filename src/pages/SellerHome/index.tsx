/* eslint-disable react-hooks/exhaustive-deps */
import { NavBar } from "@/components/NavBar";
import { SellerCard } from "@/components/Seller/SellerCard";
import { NextPage } from "next";
import { ProductBox } from "@/components/ProductBox";
import { useContext, useEffect } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ProductSellerCard } from "@/components/ProductSellerCard";
import { AuthContext } from "@/contexts/Auth/authContext";
import styles from "./styles.module.scss";
import { CreateAnnounceModal } from "@/components/Modal/CreateAnnounceModal";
import { ModalContext } from "@/contexts/Modal";

const SellerHome: NextPage = () => {
  const { userCars } = useContext(CarsContext);
  const { showModal } = useContext(ModalContext);
  const { user, autoLogin, loggedUser } = useContext(AuthContext);
 

  useEffect(() => {
    autoLogin();
    loggedUser();
  }, []);

  return (
    <>
      {showModal === "batata" ? <CreateAnnounceModal /> : null}
      <NavBar />
      <main className={styles.container__sellerMain}>
        <div className={styles.box}>
          <SellerCard />
        </div>
        <ProductBox>
          {userCars.length === 0 ? (
            <p>Não há carros cadastrados.</p>
          ) : (
            userCars.map((car) => (
              <ProductSellerCard key={car.id} car={car} user={user} />
            ))
          )}
        </ProductBox>
      </main>
    </>
  );
};
export default SellerHome;
