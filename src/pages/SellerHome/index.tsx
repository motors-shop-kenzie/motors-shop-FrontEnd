import { NavBar } from "@/components/NavBar";
import { SellerCard } from "@/components/Seller/SellerCard";
import { NextPage } from "next";
import { ProductBox } from "@/components/ProductBox";
import { useContext } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ProductSellerCard } from "@/components/ProductSellerCard";
import { AuthContext } from "@/contexts/Auth/authContext";
import styles from "./styles.module.scss";

const SellerHome: NextPage = () => {
  const { userCars } = useContext(CarsContext);
  const { user } = useContext(AuthContext);

  
  return (
    <>
      <NavBar />
      <main className={styles.container__sellerMain}>
        <div>
          <SellerCard />
        </div>
        <ProductBox>
          {userCars.length === 0 ? (
            <p>Não há carros cadastrados.</p>
          ) : (
            userCars.map((car) => (
              <ProductSellerCard key={car.id} car={car} user={user} />
            ))
          )}
        </ProductBox>
      </main>
    </>
  );
};
export default SellerHome;
