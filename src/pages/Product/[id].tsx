/* eslint-disable react-hooks/exhaustive-deps */
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
import { AuthContext } from "@/contexts/Auth/authContext";
import CreateComment from "@/components/Forms/CreateComment";
import ImgsProduct from "@/components/ImgsProduct";
import PageLoading from "@/components/PageLoading";
import { useRequest } from "@/hooks/useRequest";

const ProductPage: NextPage = () => {
  const { singleCar, getSingleCar, getComment } = useContext(CarsContext);
  const { closeNavBar, openNavBar } = useContext(AuthContext);
  const [userRelated, setUserRelated] = useState<TUser | null>(null);
  const router = useRouter();
  const [queryParam, setQueryParam] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const request = useRequest();

  useEffect(() => {
    const id: any = router.query.id;
    if (id) {
      setQueryParam(id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (queryParam) {
      setIsLoading(true);
      getSingleCar(queryParam)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [queryParam]);

  useEffect(() => {
    if (singleCar && singleCar.userId) {
      getUserRelated(singleCar.userId);
      getComment(singleCar.id);
    }
  }, [singleCar]);

  const getUserRelated = async (id: string) => {
    await request({
      tryFn: async () => {
        const response = await api.get(`/users/${id}`);
        setUserRelated(response.data);
      },
    });
  };

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
          <CreateComment userComment={userRelated!} car={singleCar!} />
        </div>
        <div className={styles.asideContainer}></div>
      </section>
    </PageLoading>
  );
};

export default ProductPage;
