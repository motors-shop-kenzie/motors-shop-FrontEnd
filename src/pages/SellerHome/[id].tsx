"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { NavBar } from "@/components/NavBar";
import { SellerCard } from "@/components/Seller/SellerCard";
import { NextPage } from "next";
import { ProductBox } from "@/components/ProductBox";
import { useContext, useEffect } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ProductSellerCard } from "@/components/ProductSellerCard";
import { AuthContext } from "@/contexts/Auth/authContext";
import { CreateAnnounceModal } from "@/components/Modal/CreateAnnounceModal";
import { ModalContext } from "@/contexts/Modal";
import { useRouter } from "next/router";
import PageLoading from "@/components/PageLoading";
import { EditAnnounceModal } from "@/components/Modal/EditAnnounceModal";
import styles from "./styles.module.scss";

const SellerHome: NextPage = () => {
  const { userCars } = useContext(CarsContext);
  const { showModal } = useContext(ModalContext);
  const { user, closeNavBar, openNavBar, loggedUser } = useContext(AuthContext);

  return (
    <PageLoading>
      {showModal === "batata" ? <CreateAnnounceModal /> : null}
      {showModal === "editCar" ? <EditAnnounceModal /> : null}
      <NavBar />
      <main className={styles.container__sellerMain} onClick={openNavBar ? closeNavBar : undefined}>
        <div className={styles.box}>
          <SellerCard />
        </div>
        <ProductBox>
          {userCars.length === 0 ? (
            <p>Não há carros cadastrados.</p>
          ) : (
            userCars.map((car) => <ProductSellerCard key={car.id} car={car} user={user} />)
          )}
        </ProductBox>
      </main>
    </PageLoading>
  );
};
export default SellerHome;
