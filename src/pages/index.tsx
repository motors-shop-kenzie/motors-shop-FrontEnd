"use client";

import { TCarProduct } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { NextPage, GetServerSideProps } from "next";
import styles from "./styles.module.scss";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductBox } from "@/components/ProductBox";

interface HomeProps {
  cars: TCarProduct[];
}

const list = ["Fiat", "BMW", "Mercedes"];

const Home: NextPage<HomeProps> = ({ cars }: HomeProps) => {
  return (
    <div className={styles.body}>
      <NavBar dealer />
      <div className={styles.car_container}>
        <div>
          <h2>Motors Shop</h2>
          <h4>A melhor plataforma de anúncios de carros do país</h4>
        </div>
      </div>
      <div className={styles.container}>
        <aside>{/* <CarFilter cars={cars} /> */}</aside>
        <main>
          <ProductBox>
            {cars.map((car) => {
              return <ProductCard key={car.id} car={car} />;
            })}
          </ProductBox>
        </main>
      </div>
      <Footer path="/" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<TCarProduct[]>("/cars");
  return {
    props: {
      cars: response.data,
    },
  };
};

export default Home;
