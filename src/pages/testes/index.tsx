"use client";

import { Button } from "@/components/Button";
import styles from "../../components/Button/styles.module.scss";
import { GetServerSideProps, NextPage } from "next";
import api from "@/services/api";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { TextArea } from "@/components/Textarea";
/* import { InputSectionField } from "@/components/InputSectionField";
 */ import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { TCarProduct } from "@/interfaces/CarProduc";
import { Footer } from "@/components/Footer";
import { CommentBox } from "@/components/CommentBox";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { CommentCard } from "@/components/CommetCard";
import { useContext } from "react";
import { ModalContext } from "@/contexts/Modal";
import { ModalCreateCar } from "@/components/Modal/Modal";
import { useModal } from "@/hooks/modalHook";
import { LoginForm } from "@/components/Forms/Login";
import { Modal } from "@/components/Modal";
import { NavBar } from "@/components/NavBar";

interface HomeProps {
  cars: TCarProduct[];
}

const Home: NextPage<HomeProps> = ({ cars }: HomeProps) => {
  const { showModal, setShowModal } = useModal();
  const handleModalOpen = () => {
    setShowModal("createContact");
  };

  const handleClick = () => {
    console.log("click funcionando");
  };

  return (
    <div className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.grey0Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey2TextLightButton}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey2TextDarkerButton}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey5TextWhiteButton}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.brand1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.brand2Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.brand4TextBrand1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey10TextGrey1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey10BorderGrey0Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey10BorderGrey4TextGrey0Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey10BorderAndTextBrand1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.brand4BorderAndTextBrand1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.grey8TextGrey0Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.feedbackAlert3TextFeedbackAlert1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.feedbackAlert2TextFeedbackAlert1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.feedbackSuccess3TextFeedbackSuccess1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.feedbackSuccess2TextFeedbackSuccess1Button}
          text="Text Button"
          onClick={handleClick}
        />
        <Button
          className={styles.brand3TextBrand4Button}
          text="Text Button"
          onClick={handleClick}
        />
      </div>
      {/*  <div className={styles.inputsContainer}>
        <InputSectionField>
          <Label htmlFor="Placeholder" name="Label" />
          <InputFocus>
            <Input
              type="text"
              className={styles.basicInputWithBorder}
              placeholder="Placeholder"
              id="Placeholder"
            />
          </InputFocus>
        </InputSectionField>

        <InputSectionField>
          <Label htmlFor="Placeholder2" name="Label" />
          <InputFocus>
            <Input
              type="text"
              className={styles.DarkerInputWithoutBorder}
              placeholder="Placeholder"
              id="Placeholder2"
            />
          </InputFocus>
        </InputSectionField>

        <InputSectionField>
          {" "}
          <Label htmlFor="Placeholder3" name="Label" />
          <InputFocus>
            <TextArea
              className={styles.basicTextAreaWithBorder}
              placeholder="Placeholder"
              id="Placeholder3"
            />
          </InputFocus>
        </InputSectionField>

        <InputSectionField>
          <Label htmlFor="Placeholder4" name="Label" />
          <InputFocus>
            <TextArea
              className={styles.darkertextAreaWithBorder}
              placeholder="Placeholder"
              id="Placeholder4"
            />
          </InputFocus>
        </InputSectionField>
        <InputSectionField>
          <InputFocus>
            <Select />
          </InputFocus>
        </InputSectionField>
      </div> */}
      {/* <button type="button" onClick={() => handleModalOpen()}>
        Abrir modal
      </button> */}
      <Button
        className={styles.grey0Button}
        text="Abrir modal"
        onClick={() => handleModalOpen()}
      />
      {showModal === "createContact" && (
        <Modal text="Abrindo Modal">
          <LoginForm />
        </Modal>
      )}
      <ProductBox>
        {cars.map((car) => {
          return <ProductCard key={car.id} car={car} />;
        })}
      </ProductBox>
      <CommentBox>
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </CommentBox>
      {/*       <Footer />
       */}{" "}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<TCarProduct[]>("/cars");
  return {
    props: {
      cars: response.data,
    },
  };
};

export default Home;
