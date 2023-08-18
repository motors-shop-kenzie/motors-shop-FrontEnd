/* eslint-disable react-hooks/exhaustive-deps */
import { InputSectionField } from "@/components/InputSectionField";
import { InputFocus } from "@/components/Input/InputFocus";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/Modal";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormCar, formRegisterCar } from "@/schemas/carSchema";
import { Select } from "@/components/Select";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import kenzieApi from "@/services/kenzieApi";
import styles from "../styles.module.scss";


interface IModel {
  brand: string
  fuel: number
  id: string
  name: string
  value: number
  year: string
}

export const CreateAnnounceModalForm = () => {
  const { setShowModal } = useContext(ModalContext);
  const { createCars } = useContext(CarsContext);
  const [brands, setBrands] = useState({})
  const [models, setModels] = useState<IModel[]>([])
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [value,setValeu] = useState<boolean>(false)
  const [inputImage, setInputImage] =useState(2)



   const getBrands = async () => {
    try{
      const brandsResponse = await kenzieApi.get("/cars");
      setBrands(brandsResponse.data)
      
    }catch(error){
      console.error(error)
    }
};


   const getModels = async () => {
    try{
      const modelsResponse = await kenzieApi.get(`/cars?brand=${brand}`);
      setModels(modelsResponse.data)

    }catch(error){
      console.error(error)
    }
};

useEffect(() =>{
 ( async () =>{
  await getBrands()
  await getModels()
})()
},[brand])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormCar>({
    resolver: zodResolver(formRegisterCar),
  });


  const gasolineFields = (gasoline:number | undefined) =>{
 
  if(gasoline === 1){
    return "FLEX"
  }
  else if(gasoline === 2){
   return "HIBRID"
  }
  else if(gasoline === 3){
    return "ELECTRIC"
  }
  }


  const submit: SubmitHandler<TFormCar> = (formData: any) => {

   if (formData.price < formData.tablePife) {
     setValeu(true)
  } else {
    setValeu(false)
  }


    const obj = { ...formData, name: formData.model, business: value, model: formData.model };
    createCars(obj)

    setShowModal("")
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
                name="marca"
                id="marca"
                register={register("brand")}
                setBrand={setBrand}
              >
                <option value="">Selecione uma marca</option>
                {
                  Object.entries(brands).map(
                    ([key, value]) => <option value={key} key={key}>{key}</option>
                  )
                }
              </Select>
            </InputFocus>
          </InputSectionField>
          {errors.brand?.message && <p>{errors.brand?.message }</p>}
          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Select
                name="modelo"
                id="modelo"
                register={register("model")}
                setBrand={setModel}
              >
                <option value="">Selecione um modelo</option>
                { models.length > 0 ?
                models.map((item: IModel) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })
                :
                null
                }
              </Select>
            </InputFocus>
          </InputSectionField>
            {errors.model?.message && <p>{errors.model?.message }</p>}

          <div className={styles.inputsInRow}>
            <InputSectionField>
            <Label htmlFor="ano" name="Ano" />
          <InputFocus>
           <Input
            type="number"
            className={InputStyles.basicInputWithBorder}
            placeholder="2018"
            id="ano"
            register={register("year")}
            value={
            models.length > 0
            ? models.find((item: IModel) => item.name === model)?.year || ""
            :""
            }
            />
            </InputFocus>
            </InputSectionField>
              {errors.year?.message && <p>{errors.year?.message }</p>}
            <InputSectionField>
              <Label htmlFor="combustivel" name="Combustível" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Gasolina / Etanol"
                  id="combustivel"
                  register={register("gasoline")}
                  value={
                  models.length > 0
                  ? gasolineFields(models.find((item: IModel) => item.name === model)?.fuel) || ""
                   : ""
  }
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
              {errors.km?.message && <p>{errors.km?.message }</p>}
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
              {errors.color?.message && <p>{errors.color?.message }</p>}
          </div>
          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="preco-tabela" name="Preco tabela FIPE" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$48.000,00"
                  id="preco-tabela"
                  register={register("tablePife")}
                  value={
                  models.length > 0
                  ? models.find((item: IModel) => item.name === model)?.value.toFixed(2) || ""
                  :""
            }
                />
              </InputFocus>
            </InputSectionField>
              {errors.tablePife?.message && <p>{errors.tablePife?.message }</p>}
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
              {errors.price?.message && <p>{errors.price?.message }</p>}
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
            {errors.description?.message && <p>{errors.description?.message }</p>}

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

          <InputSectionField>
            <Label htmlFor="1-imagem-galeria" name="1º Imagem da galeria" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="https://image.com"
                id="1-imagem-galeria"
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="1-imagem-galeria" name="2º Imagem da galeria" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="https://image.com"
                id="2-imagem-galeria"
              />
            </InputFocus>
          </InputSectionField>

          <Button
            className={ButtonStyles.brand4TextBrand1Button}
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
            <Button
              className={ButtonStyles.brand3TextBrand4Button}
              text="Criar anúncio"
              type="submit"
            />
          </section>
        </div>
      </form>
    </div>
  );
};
