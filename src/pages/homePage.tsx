import CarFilter from "@/components/CarFilter";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { Car } from "@/components/CarFilter/interface";

export default function HomePage() {
  const { getAllCarsRequest, cars } = useContext(CarsContext);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    getAllCarsRequest();
  }, []);

  const handleFilterChange = (filteredCars: Car[]) => {
    setFilteredCars(filteredCars);
  };

  console.log(cars);

  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.bg_img}></div>
      <section className={styles.car_shop}>
        <CarFilter cars={filteredCars} onFilterChange={handleFilterChange} />
        <ProductBox>
          {filteredCars.length === 0 ? (
            <p>Não há carros correspondentes aos filtros.</p>
          ) : (
            filteredCars.map((car) => <ProductCard key={car.id} car={car} />)
          )}
        </ProductBox>
      </section>
      <Footer />
    </main>
  );
}
