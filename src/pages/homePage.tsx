"use client";

import { useContext, useEffect } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import CarFilter from "@/components/CarFilter";
import styles from "./styles.module.scss";

export default function HomePage() {
  const { cars, getAllCarsRequest } = useContext(CarsContext);

  useEffect(() => {
    console.log("CARS DENTRO DO USEFFECT", cars);
    getAllCarsRequest();
  }, []);

  console.log(cars);

  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.bg_img}></div>
      <section className={styles.car_shop}>
        <CarFilter cars={cars} />
        <ProductBox>
          {cars.length === 0 ? (
            <p>Não há carros disponíveis.</p>
          ) : (
            cars.map((car) => <ProductCard key={car.id} car={car} />)
          )}
        </ProductBox>
      </section>
      <Footer path="/" />
    </main>
  );
}
