import { InputSectionField } from "@/components/InputSectionField";
import { InputFocus } from "@/components/Input/InputFocus";
import { Input } from "@/components/Input";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import { Label } from "@/components/Label";
import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { ModalContext } from "@/contexts/Modal";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCarsRegister, carSchemaRegister } from "@/schemas/carSchema";
import styles from "../styles.module.scss";

export const CreateAnnounceModalForm = () => {
  const { setShowModal } = useContext(ModalContext);
  const { createCars } = useContext(CarsContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TCarsRegister>({
    resolver: zodResolver(carSchemaRegister),
  });

  const submit: SubmitHandler<TCarsRegister> = (formData: TCarsRegister) => {
    console.log(formData);
    // createCars(formData);
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <h2 className={styles.subtitleModal}>Informações do veículo</h2>
        <div className={styles.inputsSectionModal}>
          <InputSectionField>
            <Label htmlFor="marca" name="Marca" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="Digite a marca do carro"
                id="marca"
                register={register("brand")}
              />
            </InputFocus>
          </InputSectionField>
          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder="Digite o modelo do carro"
                id="modelo"
                register={register("model")}
              />
            </InputFocus>
          </InputSectionField>

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="ano" name="Ano" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="2018"
                  id="ano"
                  register={register("year")}
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="combustivel" name="Combustível" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Gasolina / Etanol"
                  id="combustivel"
                  register={register("gasoline")}
                />
              </InputFocus>
            </InputSectionField>
          </div>

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="quilometragem" name="Quilometragem" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="30.000"
                  id="quilometragem"
                  register={register("km")}
                />
              </InputFocus>
            </InputSectionField>
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
          </div>
          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="preco-tabela" name="Preco tabela FIPE" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$48.000,00"
                  id="preco-tabela"
                  register={register("tablePife")}
                />
              </InputFocus>
            </InputSectionField>
            <InputSectionField>
              <Label htmlFor="preco" name="Preço" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$50.000,00"
                  id="preco"
                  register={register("price")}
                />
              </InputFocus>
            </InputSectionField>
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
