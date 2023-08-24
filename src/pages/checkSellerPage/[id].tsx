import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductSellerCard } from "@/components/ProductSellerCard";
import { SellerCard } from "@/components/Seller/SellerCard";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { TUser } from "@/interfaces/user";
import api from "@/services/api";
import styles from "../SellerHome/styles.module.scss";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PageLoading from "@/components/PageLoading";

export default function CheckSellerPage() {
  const [clickedUser, setClickedUser] = useState<TUser>();
  const { query } = useRouter();
  const { id }: any = query;
  const { cars } = useContext(CarsContext);

  useEffect(() => getClickedUser(id), [id]);

  const getClickedUser = (id: string) => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        setClickedUser(response.data);
      })
      .catch((error) => console.error(error));
  };

  const filteredCars = cars.filter((element) => element.userId == id);

  return (
    <PageLoading>
      <NavBar />
      <main className={styles.container__sellerMain}>
        <div className={styles.box}>
          <SellerCard clickedUser={clickedUser} />
        </div>
        <h3 className={styles.title}>Anúncios</h3>
        <ProductBox>
          {filteredCars.length === 0 ? (
            <p>Não há carros cadastrados.</p>
          ) : (
            filteredCars.map((car) => (
              <ProductSellerCard key={car.id} car={car} user={clickedUser} isClickedUser={true} />
            ))
          )}
        </ProductBox>
        <Footer path={`/checkSellerPage/${id}`} />
      </main>
    </PageLoading>
  );
}
