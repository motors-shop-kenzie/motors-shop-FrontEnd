import { Button } from "@/components/Button";
import styles from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import { GetServerSideProps, NextPage } from "next";
import { CarData } from "@/schemas/carSchema";
import api from "@/services/api";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { TextArea } from "@/components/Textarea";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import Filter from "@/components/FilterAside";

interface HomeProps {
  cars: CarData[];
}

const listBrand = ["Fiat", "BMW", "Mercedes", "Ford", "Honda"];
const listModel = ["Civic", "Corola", "Cruze", "Gol", "Onix"];
const listColor = ["Azul", "Verde", "Branco", "Amarelo", "Preto"];
const listYear = ["2000", "1999", "2020", "2023"];
const listGasoline = ["Elétrico", "Híbrido", "Flex"];

const Home: NextPage<HomeProps> = ({ cars }: HomeProps) => {
  return (
    <>
      <div className={styles.buttonsContainer}>
        {/* <Button className={styles.grey0Button} text="Text Button" />
                <Button className={styles.grey1Button} text="Text Button" />
                <Button
                    className={styles.grey2TextLightButton}
                    text="Text Button"
                />
                <Button
                    className={styles.grey2TextDarkerButton}
                    text="Text Button"
                />
                <Button
                    className={styles.grey5TextWhiteButton}
                    text="Text Button"
                />
                <Button className={styles.brand1Button} text="Text Button" />
                <Button className={styles.brand2Button} text="Text Button" />
                <Button
                    className={styles.brand4TextBrand1Button}
                    text="Text Button"
                />
                <Button
                    className={styles.grey10TextGrey1Button}
                    text="Text Button"
                />
                <Button
                    className={styles.grey10BorderGrey0Button}
                    text="Text Button"
                />
                <Button
                    className={styles.grey10BorderGrey4TextGrey0Button}
                    text="Text Button"
                />
                <Button
                    className={styles.grey10BorderAndTextBrand1Button}
                    text="Text Button"
                />
                <Button
                    className={styles.brand4BorderAndTextBrand1Button}
                    text="Text Button"
                />
                <Button
                    className={styles.grey8TextGrey0Button}
                    text="Text Button"
                />
                <Button
                    className={styles.feedbackAlert3TextFeedbackAlert1Button}
                    text="Text Button"
                />
                <Button
                    className={styles.feedbackAlert2TextFeedbackAlert1Button}
                    text="Text Button"
                />
                <Button
                    className={
                        styles.feedbackSuccess3TextFeedbackSuccess1Button
                    }
                    text="Text Button"
                />
                <Button
                    className={
                        styles.feedbackSuccess2TextFeedbackSuccess1Button
                    }
                    text="Text Button"
                />
                <Button
                    className={styles.brand3TextBrand4Button}
                    text="Text Button"
                /> */}
      </div>
      <div className={styles.inputsContainer}>
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
          <Select />
        </InputSectionField>
      </div>
      <aside>
        <Filter title="Marca" list={listBrand} />
        <Filter title="Modelo" list={listModel} />
        <Filter title="Cor" list={listColor} />
        <Filter title="Ano" list={listYear} />
        <Filter title="Combustível" list={listGasoline} />
      </aside>
      {cars.map((car) => {
        return <ProductCard key={car.id} car={car} />;
      })}
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
