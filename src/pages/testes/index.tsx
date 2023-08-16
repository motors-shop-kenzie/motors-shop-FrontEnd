"use client";

import { Button } from "@/components/Button";
import styles from "./styles.module.scss";
import { GetServerSideProps, NextPage } from "next";
import api from "@/services/api";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { TextArea } from "@/components/Textarea";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
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
import { TUser } from "@/interfaces/user";

interface HomeProps {
  cars: TCarProduct[];
  user: TUser;
}

const Home: NextPage<HomeProps> = ({ cars, user }: HomeProps) => {
  const { showModal, setShowModal } = useModal();
  const handleModalOpen = () => {
    setShowModal("createContact");
  };

  console.log(user);

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

      <div className={styles.inputsContainer}>
        {/* <InputSectionField>
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
        </InputSectionField>  */}

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
      </div>
      <button type="button" onClick={() => handleModalOpen()}>
        Abrir modal
      </button> 
       <Button
        className={styles.grey0Button}
        text="Abrir modal"
        onClick={() => handleModalOpen()}
      />

      {showModal === "createContact" && (
        <Modal text="Abrindo Modal">
          modal aberto
        </Modal>
      )}

      <ProductBox>
        {cars.map((car) => {
          return <ProductCard key={car.id} car={car} user={user} />;
        })}
      </ProductBox>

      <CommentBox>
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </CommentBox>

      {/* <div>
        <h1>{user.name}</h1>
        <h2>{user.id}</h2>
        <h2>{user.createdAt}</h2>
        <h2>{user.email}</h2>
        <h2>{user.cpf}</h2>
        <h2>{user.isAdmin}</h2>
        <h2>{user.telephone}</h2>
        <h2>{user.description}</h2>
        <h2>{user.birthdate}</h2>
        <h2>{user.address.city}</h2>
      </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const carsResponse = await api.get<TCarProduct[]>("/cars");
  const userResponse = await api.get<TUser>(
    "/users/76089207-bcdf-4cbb-8a24-8a201976f706"
  );
  return {
    props: {
      cars: carsResponse.data,
      user: userResponse.data,
    },
  };
};

export default Home;
