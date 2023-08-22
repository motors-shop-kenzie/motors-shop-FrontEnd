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

  // tags h3 com informações diversas apenas pra ilustrar que os dados estão chegando corretamente

  return (
    <>
      <NavBar />
      <Image src={singleCar!.coverImg} alt="Imagem de capa" width={300} height={150} />
      <h3>{singleCar?.model}</h3>
      <h3>{singleCar?.brand}</h3>
      <h3>{singleCar?.description}</h3>

      <br />
      <h3>{userRelated?.name} </h3>
      <h3>{userRelated?.description} </h3>
      <h3>{userRelated?.id} </h3>
    </>
  );
};
export default ProductPage;
