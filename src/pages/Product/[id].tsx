"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useRouter } from "next/router";
import { NavBar } from "@/components/NavBar";
import api from "@/services/api";
import { TUser } from "@/interfaces/user";
import ProductCoverImage from "@/components/ProductImage";
import ProductInfos from "@/components/ProductInfos";
import styles from "./styles.module.scss";
import ProductDescription from "@/components/ProductDescription";
import ProfileUserInfos from "@/components/ProfileUserInfos";
import { Footer } from "@/components/Footer";
import { AuthContext } from "@/contexts/Auth/authContext";
import ImgsProduct from "@/components/ImgsProduct";
import PageLoading from "@/components/PageLoading";

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const { singleCar, getSingleCar, cars } = useContext(CarsContext);
  const { closeNavBar, openNavBar } = useContext(AuthContext);
  const { id }: any = query;
  const [userRelated, setUserRelated] = useState<TUser>();

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  useEffect(() => {
    getUserRelated();
  });

  const getUserRelated = () => {
    api
      .get(`/users/${singleCar?.userId}`)
      .then((response) => {
        setUserRelated(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    // <PageLoading>
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles.mainContainer} onClick={openNavBar ? closeNavBar : undefined}>
        <span className={styles.purpleBg}></span>
        <section className={styles.carInfoSection}>
          <ProductCoverImage />
          <ProductInfos />
          <ProductDescription />
        </section>
        <aside className={styles.asideContainer}>
          <div>{singleCar && <ImgsProduct />}</div>
          {userRelated && (
            <ProfileUserInfos userId={userRelated.id} name={userRelated.name} description={userRelated?.description} />
          )}
        </aside>
      </main>
      <Footer path={`/Product/${id}`} />
    </>
    // </PageLoading>
  );
};
export default ProductPage;

// Discutir sobre colocar o staticSidegeneration pois é mias performatico e economiza ciclo de vida das renderizações
