"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { NavBar } from "@/components/NavBar";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { AuthContext } from "@/contexts/Auth/authContext";
import { ModalContext } from "@/contexts/Modal";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import Image from "next/image";
import { Car } from "@/interfaces/CarFilter";

const ProductPage: NextPage = () => {
  const { replace, query } = useRouter();
  const { userCars, singleCar, getSingleCar, cars } = useContext(CarsContext);
  const { showModal } = useContext(ModalContext);
  const { closeNavBar, openNavBar } = useContext(AuthContext);
  const { id } = query;

  console.log(id);
  console.log(singleCar);

  useEffect(() => {
    if (id) {
      getSingleCar(String(id));
    }
  }, [id]);

  // if (!singleCar) {
  //   const cookie = "ccm.token";

  //   setCookie(null, cookie, "", { maxAge: 0, path: "/" });

  //   destroyCookie(null, cookie);

  //   replace("/");
  //   return null;
  // }

  return (
    <>
      {/* <NavBar /> */}
      <Image src={singleCar!.coverImg} alt="Imagem de capa" width={300} height={150} />
      <h2>{singleCar?.model}</h2>
      <h2>{singleCar?.user.name}</h2>
    </>
  );
};
export default ProductPage;
