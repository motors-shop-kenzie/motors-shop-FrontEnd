"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import api from "@/services/api";
import { TUser } from "@/interfaces/user";

import ProductCoverImage from "@/components/ProductImage";
import ProductInfos from "@/components/ProductInfos";

import styles from "./styles.module.scss";
import ProductDescription from "@/components/ProductDescription";
import ProfileUserInfos from "@/components/ProfileUserInfos";

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const { singleCar, getSingleCar, cars } = useContext(CarsContext);
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
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles.mainContainer}>
        <span className={styles.purpleBg}></span>
        <section className={styles.carInfoSection}>
          <ProductCoverImage />
          <ProductInfos />
          <ProductDescription />
        </section>
        <aside className={styles.asideContainer}>
          <div></div>
          {/* <ProfileUserInfos /> */}
        </aside>
      </main>
    </>
  );
};
export default ProductPage;
