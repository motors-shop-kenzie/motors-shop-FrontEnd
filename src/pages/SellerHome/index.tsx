import { NavBar } from "@/components/NavBar";
import { RenderCarsSeller } from "@/components/Seller/RenderCarsSeller";
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
        {/* <RenderCarsSeller /> */}
      </main>
    </>
  );
};
export default SellerHome;
