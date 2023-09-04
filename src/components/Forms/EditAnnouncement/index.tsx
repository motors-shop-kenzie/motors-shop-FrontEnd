import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/Textarea";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { ModalContext } from "@/contexts/Modal";
import { ICreateCarImg, TCarImg, TCarUpdate } from "@/interfaces/CarProduc";
import { carImgRegisterSchema, carSchemaUpdate } from "@/schemas/carSchema";
import kenzieApi from "@/services/kenzieApi";
import { schemaValidation } from "@/utils/validationUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpStatusCode } from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
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

interface IImages {
  toCreate: ICreateCarImg[];
  toUpdate: TCarImg[];
  toDelete: TCarImg[];
}

export default function EditAnnouncementForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    clearErrors,
    setValue,
  } = useForm<TCarUpdate>({ resolver: zodResolver(carSchemaUpdate) });

  const { closeModal } = useContext(ModalContext);
  const { createImg, destroyCar, destroyImg, patchCar, patchImg, singleCar } = useContext(CarsContext);
  const [brands, setBrands] = useState<string[]>([]);
  const [currentBrand, setCurrentBrand] = useState(singleCar?.brand ?? "");
  const [models, setModels] = useState<IModel[]>([]);
  const [selectModel, setSelectModel] = useState(singleCar?.model ?? "");
  const [active, setActive] = useState<boolean>(singleCar?.active ?? false);
  const [imageValues, setImageValues] = useState<(TCarImg | ICreateCarImg)[]>(singleCar?.img ?? []);
  const [imagesForDestroy, setImagesForDestroy] = useState<TCarImg[]>([]);

  const images: IImages = useMemo(() => {
    const create = imageValues.filter((image) => !("id" in image) && image.url_img) as ICreateCarImg[];
    const update = imageValues.filter((image) => "id" in image) as TCarImg[];

    return { toCreate: create, toUpdate: update, toDelete: imagesForDestroy };
  }, [imageValues, imagesForDestroy]);

  const handleInputImg = useCallback(
    (index: number, value: string | undefined): void => {
      setImageValues((prev) => {
        if (value?.length) {
          const values = [...prev];
          values[index].url_img = value;

          const { message } = schemaValidation(carImgRegisterSchema, values[index]);
          if (message) setError(`img.${index}.url_img`, { type: "manual", message });
          else clearErrors(`img.${index}.url_img`);

          return values;
        }
        prev.splice(index);
        clearErrors(`img.${index}.url_img`);

        return prev;
      });
    },
    [clearErrors, setError],
  );

  const handleDeleteImg = useCallback((index: number, img: TCarImg) => {
    setImageValues((prev) => {
      const images = [...prev];
      images.splice(index, 1);

      return images;
    });

    if (img.id) setImagesForDestroy((prev) => [...prev, img]);
  }, []);

  const InputImage = useMemo(
    () =>
      imageValues.map(
        (img, idx) =>
          img && (
            <InputSectionField key={JSON.stringify(img)}>
              <button
                type="button"
                className={styles.button__delete_image}
                onClick={() => handleDeleteImg(idx, img as TCarImg)}
              >
                <IoCloseSharp />
              </button>
              <Label htmlFor={`${idx}-imagem-galeria`} name={`${idx + 1}º Imagem da galeria`} />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="https://image.com"
                  id="1-imagem-galeria"
                  onChangeFn={(e) => handleInputImg(idx, e.target.value)}
                  value={imageValues[idx].url_img}
                />
              </InputFocus>
              {errors?.img?.[idx] && <small style={{ color: "red" }}>{`* ${errors.img[idx]?.url_img?.message}`}</small>}
            </InputSectionField>
          ),
      ),
    [imageValues, errors.img, handleInputImg, handleDeleteImg],
  );

  const handleNewInputImage = () => {
    setImageValues((prev) => [...prev, { carProduct: singleCar?.id, url_img: "" } as ICreateCarImg]);
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
  useEffect(() => FIPEValues(), [FIPEValues]);

  useEffect(() => {
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

  const handleDelete = () => {
    destroyCar();
  };

  const submit: SubmitHandler<TCarUpdate> = (data) => {
    const car: TCarUpdate = { ...data, color: data.color!.toUpperCase(), active, business: data.price! < data.tablePife! };

    patchCar(car);
    images.toCreate.forEach((img) => {
      createImg(img);
    });
    images.toUpdate.forEach((img) => {
      patchImg(img);
    });
    images.toDelete.forEach((img) => {
      destroyImg(img);
    });

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

          {InputImage}

          <Button
            className={ButtonStyles.brand4TextBrand1Button}
            onClick={handleNewInputImage}
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
