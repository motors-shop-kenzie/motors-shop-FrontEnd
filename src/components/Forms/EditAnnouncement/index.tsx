import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/Textarea";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ModalContext } from "@/contexts/Modal";
import { TCarUpdate } from "@/interfaces/CarProduc";
import { carSchemaUpdate } from "@/schemas/carSchema";
import kenzieApi from "@/services/kenzieApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpStatusCode } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonStyles from "../../Button/styles.module.scss";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import styles from "../styles.module.scss";

interface ICar {
  name: string;
}

interface ICarBrand {
  [brand: string]: ICar[];
}

interface IModel {
  brand: string;
  fuel: number;
  id: string;
  name: string;
  value: string;
  year: string;
}

export default function EditAnnouncementForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<TCarUpdate>({ resolver: zodResolver(carSchemaUpdate) });

  const { closeModal } = useContext(ModalContext);
  const { destroyCar, patchCar, singleCar } = useContext(CarsContext);
  const [brands, setBrands] = useState<string[]>([]);
  const [currentBrand, setCurrentBrand] = useState(singleCar?.brand ?? "");
  const [models, setModels] = useState<IModel[]>([]);
  const [selectModel, setSelectModel] = useState(singleCar?.model ?? "");
  const [active, setActive] = useState<boolean>(singleCar?.active ?? false);

  /**
   * Takes a fuel type parameter and returns a string representing the type of fuel.
   * @param fuelType - A number or undefined representing the type of fuel.
   * @returns A string representing the type of fuel, or undefined if the input is not a valid fuel type.
   */
  const fuelStringType = (fuelType: number | undefined): string | undefined => {
    switch (fuelType) {
      case 1:
        return "FLEX";
      case 2:
        return "HIBRID";
      case 3:
        return "ELECTRIC";
      default:
        return undefined;
    }
  };
  const FIPEValues = useCallback(
    (FIPEInfo: IModel | undefined = undefined) => {
      if (models.length) FIPEInfo = models.find((mod) => mod.name === selectModel);
      if (FIPEInfo) {
        let { fuel, value, year } = { ...FIPEInfo };
        value = Number(value).toFixed(2).toString();

        const fuelString: string | undefined = fuelStringType(fuel);
        setValue("gasoline", fuelString);
        setValue("tablePife", +value);
        setValue("year", +year);
      } else {
        setValue("gasoline", singleCar?.gasoline);
        setValue("tablePife", singleCar?.tablePife);
        setValue("year", singleCar?.year);
      }
    },
    [models, selectModel, setValue, singleCar],
  );

  useEffect(() => {
    console.clear();
    (async () => {
      try {
        const { data, status } = await kenzieApi.get<ICarBrand>("/cars");
        if (status === HttpStatusCode.Ok) setBrands(Object.keys(data));
      } catch (error) {
        console.error("error:", error);
      }
    })();

    (async () => {
      try {
        const { data, status } = await kenzieApi.get<IModel[]>(`/cars?brand=${currentBrand}`);
        if (status === HttpStatusCode.Ok) setModels((prev) => (prev !== data ? data : prev));
      } catch (error) {
        console.error("error:", error);
      }
    })();
  }, [currentBrand]);

  useEffect(() => FIPEValues(), [FIPEValues]);

  const handleDelete = () => {
    destroyCar();
  };

  const submit: SubmitHandler<TCarUpdate> = (data) => {
    const car: TCarUpdate = { ...data, active, business: data.price! < data.tablePife! };

    patchCar(car);

    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <h2 className={styles.subtitleModal}>Informações do veículo</h2>
        <div className={styles.inputsSectionModal}>
          <InputSectionField>
            <Label htmlFor="marca" name="Marca" />
            <InputFocus>
              <Select
                value={currentBrand}
                name="marca"
                id="marca"
                register={register("brand", { value: currentBrand })}
                setBrand={setCurrentBrand}
              >
                {brands.map((databaseBrand) => (
                  <option key={databaseBrand} value={databaseBrand}>
                    {databaseBrand}
                  </option>
                ))}
              </Select>
            </InputFocus>
          </InputSectionField>
          {errors.brand?.message && <p>{errors.brand.message}</p>}

          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Select
                value={selectModel ?? ""}
                name="modelo"
                id="modelo"
                register={register("model", { value: selectModel })}
                setBrand={setSelectModel}
              >
                <option value="">Selecione um modelo</option>
                {models.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </Select>
            </InputFocus>
          </InputSectionField>
          {errors.model?.message && <p>{errors.model.message}</p>}

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="ano" name="Ano" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="2018"
                  id="ano"
                  register={register("year", { valueAsNumber: true })}
                  disabled
                />
              </InputFocus>
            </InputSectionField>
            {errors.year?.message && <p>{errors.year?.message}</p>}

            <InputSectionField>
              <Label htmlFor="combustivel" name="Combustível" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Gasolina / Etanol"
                  id="combustivel"
                  register={register("gasoline")}
                  disabled
                />
              </InputFocus>
            </InputSectionField>
          </div>

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="quilometragem" name="Quilometragem" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="30.000"
                  id="quilometragem"
                  register={register("km", { value: singleCar?.km })}
                />
              </InputFocus>
            </InputSectionField>
            {errors.km?.message && <p>{errors.km.message}</p>}

            <InputSectionField>
              <Label htmlFor="cor" name="Cor" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Branco"
                  id="cor"
                  register={register("color", { value: singleCar?.color })}
                />
              </InputFocus>
            </InputSectionField>
            {errors.color?.message && <p>{errors.color.message}</p>}
          </div>

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="preco-tabela" name="Preço tabela FIPE" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$48.000,00"
                  id="preco-tabela"
                  register={register("tablePife", { valueAsNumber: true })}
                  disabled
                />
              </InputFocus>
            </InputSectionField>
            {errors.tablePife?.message && <p>{errors.tablePife.message}</p>}

            <InputSectionField>
              <Label htmlFor="preco" name="Preço" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$50.000,00"
                  id="preco"
                  register={register("price", { value: singleCar?.price })}
                />
              </InputFocus>
            </InputSectionField>
            {errors.price?.message && <p>{errors.price.message}</p>}
          </div>

          <InputSectionField>
            <Label htmlFor="descricao" name="Descricao" />
            <InputFocus>
              <TextArea
                className={TextAreaStyles.basicTextAreaWithBorder}
                placeholder="Descrição"
                id="descricao"
                register={register("description", { value: singleCar?.description })}
              />
            </InputFocus>
          </InputSectionField>
          {errors.description?.message && <p>{errors.description.message}</p>}

          <InputSectionField>
            <Label htmlFor="published" name="Publicado" />

            <div className={styles.publishedButtonsDiv}>
              <Button
                className={active ? ButtonStyles.brand1Button : ButtonStyles.grey10TextGrey1Button}
                text="Sim"
                type="button"
                onClick={() => setActive(true)}
              />
              <Button
                className={!active ? ButtonStyles.brand1Button : ButtonStyles.grey10TextGrey1Button}
                text="Não"
                type="button"
                onClick={() => setActive(false)}
              />
            </div>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="imagem-capa" name="Imagem da capa" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="https://image.com"
                id="imagem-capa"
                register={register("coverImg", { value: singleCar?.coverImg })}
              />
            </InputFocus>
          </InputSectionField>

          {/* {renderInputImage()} */}

          <Button
            className={ButtonStyles.brand4TextBrand1Button}
            // onClick={() => setInputImage(inputImage + 1)}
            text="Adicionar campo para imagem da galeria"
            type="button"
          />

          <section className={styles.finalButtonsDivModal}>
            <Button
              className={ButtonStyles.feedbackAlert3TextFeedbackAlert1Button}
              text="Excluir anúncio"
              onClick={handleDelete}
              type="button"
            />
            <Button className={ButtonStyles.brand3TextBrand4Button} text="Salvar alterações" type="submit" />
          </section>
        </div>
      </form>
    </div>
  );
}
