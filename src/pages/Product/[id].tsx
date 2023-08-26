"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useRouter } from "next/router";
import { NavBar } from "@/components/NavBar";
import api from "@/services/api";
import { TUser } from "@/interfaces/user";
import ProductCoverImage from "@/components/ProductImage";
import ProductInfos from "@/components/ProductInfos";
import styles from "./styles.module.scss";
import ProductDescription from "@/components/ProductDescription";
import ProfileUserInfos from "@/components/ProfileUserInfos";
import { Footer } from "@/components/Footer";
import { AuthContext } from "@/contexts/Auth/authContext";
import CreateComment from "@/components/Forms/CreateComment";
import ImgsProduct from "@/components/ImgsProduct";
import PageLoading from "@/components/PageLoading";
import { useRequest } from "@/hooks/useRequest";
import { Loading } from "@/components/PageLoading/Loading";

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const { singleCar, getSingleCar, getComment } = useContext(CarsContext);
  const { closeNavBar, openNavBar } = useContext(AuthContext);
  const { id }: any = query;
  const [userRelated, setUserRelated] = useState<TUser | null>(null);

  const request = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      await getSingleCar(id);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const getUserRelated = async () => {
      if (singleCar) {
        await request({
          tryFn: async () => {
            const response = await api.get(`/users/${singleCar.userId}`);
            setUserRelated(response.data);
          },
        });
      }
    };

    getUserRelated();
    getComment(id);
  }, [singleCar]);

  if (!singleCar) {
    return (
      <PageLoading>
        <Loading />
      </PageLoading>
    );
  }

  return (
    <PageLoading>
      <header>
        <NavBar />
      </header>
      <main className={styles.mainContainer} onClick={openNavBar ? closeNavBar : undefined}>
        <span className={styles.purpleBg}></span>
        <section className={styles.carInfoSection}>
          <ProductCoverImage />
          <ProductInfos />
          <ProductDescription />
        </section>
        <aside className={styles.asideContainer}>
          <div className={styles.imgsDiv}>{singleCar && <ImgsProduct />}</div>
          {userRelated && (
            <ProfileUserInfos
              userId={userRelated.id}
              name={userRelated.name}
              description={userRelated.description}
              user={userRelated}
            />
          )}
        </aside>
      </main>
      <section className={styles.secondSection}>
        <div className={styles.commentsSection}>
          {/*           <Comments user={userRelated!} car={singleCar!} />
           */}{" "}
          <CreateComment user={userRelated!} car={singleCar!} />
        </div>
        <div className={styles.asideContainer}></div>
      </section>
      <Footer path={`/Product/${id}`} />
    </PageLoading>
  );
};

export default ProductPage;
