import { NavBar } from "@/components/NavBar";
import { SellerCard } from "@/components/Seller/SellerCard";
import { NextPage } from "next";
import styles from "./styles.module.scss";

const SellerHome: NextPage = () => {
  return (
    <>
      <NavBar />
      <main className={styles.container__sellerMain}>
        <div>
          <SellerCard />
        </div>
        
      </main>
    </>
  );
};
export default SellerHome;
