/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/Textarea";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ModalContext } from "@/contexts/Modal";
import { TCarImgRegister, TCarsPayloadRequest } from "@/interfaces/CarProduc";
import { carImgRegisterSchema, payloadRequestSchema } from "@/schemas/carSchema";
import kenzieApi from "@/services/kenzieApi";
import { schemaValidation } from "@/utils/validationUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonStyles from "../../Button/styles.module.scss";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import styles from "../styles.module.scss";

interface IModel {
  brand: string;
  fuel: number;
  id: string;
  name: string;
  value: string;
  year: string;
}

export const CreateAnnounceModalForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
  } = useForm<TCarsPayloadRequest>({
    resolver: zodResolver(payloadRequestSchema),
  });

  const { setShowModal } = useContext(ModalContext);
  const { createCars } = useContext(CarsContext);
  const [brands, setBrands] = useState({});
  const [models, setModels] = useState<IModel[]>([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [inputImage, setInputImage] = useState(2);
  const [imageValues, setImageValues] = useState<TCarImgRegister[]>([]);

  const handleInputImg = (index: number, value: string | undefined): void => {
    setImageValues((prev) => {
      if (value?.length) {
        const values = [...prev];
        values[index] = { url_img: value };

        const { message } = schemaValidation(carImgRegisterSchema, values[index]);
        if (message) setError(`img.${index}.url_img`, { type: "manual", message });
        else clearErrors(`img.${index}.url_img`);

        return values;
      }
      prev.splice(index);
      clearErrors(`img.${index}.url_img`);

      return prev;
    });
  };

  const renderInputImage = () => {
    const inputs: React.JSX.Element[] = [];

    for (let i = 1; i <= inputImage; i++) {
      inputs.push(
        <InputSectionField key={i}>
          <Label htmlFor={`${i}-imagem-galeria`} name={`${i}º Imagem da galeria`} />
          <InputFocus>
            <Input
              type="text"
              className={InputStyles.basicInputWithBorder}
              placeholder="https://image.com"
              id="1-imagem-galeria"
              onChangeFn={(e) => handleInputImg(i, e.target.value)}
            />
          </InputFocus>
          {errors?.img?.[i] && <small style={{ color: "red" }}>{`* ${errors.img[i]?.url_img?.message}`}</small>}
        </InputSectionField>,
      );
    }

    return inputs;
  };

  const getBrands = async () => {
    try {
      const brandsResponse = await kenzieApi.get("/cars");
      setBrands(brandsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getModels = async () => {
    try {
      const modelsResponse = await kenzieApi.get(`/cars?brand=${brand}`);
      setModels(modelsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };


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
  const FIPEValues = (FIPEInfo: IModel | undefined = undefined) => {
    if (models.length) FIPEInfo = models.find((mod) => mod.name === model);

    if (FIPEInfo) {
      let { fuel, value, year } = { ...FIPEInfo };
      value = Number(value).toFixed(2).toString();

      const fuelString: string | undefined = fuelStringType(fuel);
      setValue("gasoline", fuelString!);
      setValue("tablePife", +value);
      setValue("year", +year);
    }
  };

  useEffect(() => {
    (async () => {
      await getBrands();
      await getModels();
    })();

    FIPEValues();
  }, [brand, model]);

  const submit: SubmitHandler<TCarsPayloadRequest> = (formData) => {
    imageValues.forEach((image, idx) => handleInputImg(idx, image?.url_img));
    if (Object.keys(errors).length) return;

    const images: TCarImgRegister[] = imageValues.filter((img) => img?.url_img);

    const car: TCarsPayloadRequest = { ...formData, color:formData.color.toUpperCase(), business: formData.price < formData.tablePife, img: [...images] };

    createCars(car);
    setInputImage(2);
    setShowModal("");
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <h2 className={styles.subtitleModal}>Informações do veículo</h2>

        <div className={styles.inputsSectionModal}>
          <InputSectionField>
            <Label htmlFor="marca" name="Marca" />
            <InputFocus>
              <Select name="marca" id="marca" register={register("brand")} setBrand={setBrand}>
                <option value="">Selecione uma marca</option>
                {Object.entries(brands).map(([key, _]) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </Select>
            </InputFocus>
          </InputSectionField>
          {errors.brand?.message && <p>{errors.brand?.message}</p>}

          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Select name="modelo" id="modelo" register={register("model")} setBrand={setModel}>
                <option value="">Selecione um modelo</option>
                {models.length > 0
                  ? models.map((item: IModel) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </InputFocus>
          </InputSectionField>
          {errors.model?.message && <p>{errors.model?.message}</p>}

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
                  register={register("km")}
                />
              </InputFocus>
            </InputSectionField>
            {errors.km?.message && <p>{errors.km?.message}</p>}

            <InputSectionField>
              <Label htmlFor="cor" name="Cor" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Branco"
                  id="cor"
                  register={register("color")}
                />
              </InputFocus>
            </InputSectionField>
            {errors.color?.message && <p>{errors.color?.message}</p>}
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
            {errors.tablePife?.message && <p>{errors.tablePife?.message}</p>}

            <InputSectionField>
              <Label htmlFor="preco" name="Preço" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$50.000,00"
                  id="preco"
                  register={register("price")}
                />
              </InputFocus>
            </InputSectionField>
            {errors.price?.message && <p>{errors.price?.message}</p>}
          </div>

          <InputSectionField>
            <Label htmlFor="descricao" name="Descricao" />
            <InputFocus>
              <TextArea
                className={TextAreaStyles.basicTextAreaWithBorder}
                placeholder="Descrição"
                id="descricao"
                register={register("description")}
              />
            </InputFocus>
          </InputSectionField>
          {errors.description?.message && <p>{errors.description?.message}</p>}

          <InputSectionField>
            <Label htmlFor="imagem-capa" name="Imagem da capa" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="https://image.com"
                id="imagem-capa"
                register={register("coverImg")}
              />
            </InputFocus>
          </InputSectionField>

          {renderInputImage()}

          <Button
            className={ButtonStyles.brand4TextBrand1Button}
            onClick={() => setInputImage(inputImage + 1)}
            text="Adicionar campo para imagem da galeria"
            type="button"
          />

          <section className={styles.finalButtonsDivModal}>
            <Button
              className={ButtonStyles.grey6TextDarkButton}
              text="Cancelar"
              type="button"
              onClick={() => setShowModal("")}
            />
            <Button className={ButtonStyles.brand3TextBrand4Button} text="Criar anúncio" type="submit" />
          </section>
        </div>
      </form>
    </div>
  );
};
