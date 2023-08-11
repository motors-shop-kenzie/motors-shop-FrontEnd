import CarFilter from "@/components/CarFilter";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { TCarProduct } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { GetServerSideProps } from "next";
import styles from "./styles.module.scss";


interface HomePageProps {
  cars: TCarProduct[];
}

export default function HomePage({ cars }: HomePageProps) {
  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.bg_img}></div>
      <section className={styles.car_shop}>
        <CarFilter
          cars={[]}
          onFilterChange={(filters) => console.log(filters)}
        />
        {""}
        <ProductBox>
          {cars.map((car) => {
            return <ProductCard key={car.id} car={car} />;
          })}
        </ProductBox>
      </section>
      <Footer />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<TCarProduct[]>("/cars");
  return {
    props: {
      cars: response.data,
    },
  };
};
