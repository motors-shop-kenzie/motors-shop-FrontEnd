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
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";

const SellerHome: NextPage = () => {
  const { replace, query } = useRouter();
  const { userCars } = useContext(CarsContext);
  const { showModal } = useContext(ModalContext);
  const { user, loggedUser, logout } = useContext(AuthContext);
  const { id } = query;

  useEffect(() => {
    loggedUser();
  }, []);

  if (id !== user?.id) {
    const cookie = "ccm.token";

    setCookie(null, cookie, "", { maxAge: 0, path: "/" });

    destroyCookie(null, cookie);

    replace("/login");
    return null;
  }

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
            userCars.map((car) => <ProductSellerCard key={car.id} car={car} user={user} />)
          )}
        </ProductBox>
      </main>
    </>
  );
};
export default SellerHome;
