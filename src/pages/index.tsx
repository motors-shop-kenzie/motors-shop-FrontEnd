import { Button } from "@/components/Button";
import styles from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import { GetServerSideProps, NextPage } from "next";
import { CarData } from "@/schemas/carSchema";
import api from "@/services/api";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/NavBar";

interface HomeProps {
  cars: CarData[];
}

const Home: NextPage<HomeProps> = ({ cars }: HomeProps) => {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        {cars.map((car) => {
          return <ProductCard key={car.id} car={car} />;
        })}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<CarData[]>("/cars");
  return {
    props: {
      cars: response.data,
    },
  };
};

export default Home;
