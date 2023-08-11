import CarFilter from "@/components/CarFilter";
import { LoginForm } from "@/components/Forms/Login";
import { Modal } from "@/components/Modal";
import { ModalCreateCar } from "@/components/Modal/Modal";
import { ModalContext } from "@/contexts/Modal";
import { TCarProduct } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import Home from "./testes";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import styles from "./styles.module.scss";

interface HomePageProps {
  cars: TCarProduct[];
}

export default function HomePage({ cars }: HomePageProps) {
  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <section>
        <h1>Titulo ficticio</h1>
        {/* {showModal === "createContact" && <ModalCreateCar />} */}
        <CarFilter
          // aqui devo passar a lista de carros que vão vir através da api
          cars={[]}
          onFilterChange={(filters) => console.log(filters)}
        />{" "}
      </section>
      <ProductBox>
        {cars.map((car) => {
          return <ProductCard key={car.id} car={car} />;
        })}
      </ProductBox>
      <Footer />
    </main>
  );
}

const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<TCarProduct[]>("/cars");
  return {
    props: {
      cars: response.data,
    },
  };
};
