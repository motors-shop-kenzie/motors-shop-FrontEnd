import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";

import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { ModalContext } from "@/contexts/Modal";

import ButtonStyles from "../../Button/styles.module.scss";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import styles from "../styles.module.scss";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { useForm } from "react-hook-form";

export default function EditAnnounceModalForm() {
  const { setShowModal, closeModal } = useContext(ModalContext);
  const { destroyCar, patchCar } = useContext(CarsContext);
  const { handleSubmit } = useForm();

  const handleDelete = () => {
    destroyCar();
  };
  const submit = (data: any) => {
    patchCar(data);
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
              <Select name="marca" id="marca">
                <option>Opção atual</option>
              </Select>
            </InputFocus>
          </InputSectionField>
          {/* {errors.brand?.message && <p>{errors.brand?.message}</p>} */}

          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Select name="modelo" id="modelo">
                <option value="">Selecione um modelo</option>

                <option>Opção atual</option>
              </Select>
            </InputFocus>
          </InputSectionField>
          {/* {errors.model?.message && <p>{errors.model?.message}</p>} */}

          <div className={styles.inputsInRow}>
            <InputSectionField>
              <Label htmlFor="ano" name="Ano" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="2018"
                  id="ano"
                  disabled
                />
              </InputFocus>
            </InputSectionField>
            {/* {errors.year?.message && <p>{errors.year?.message}</p>} */}

            <InputSectionField>
              <Label htmlFor="combustivel" name="Combustível" />
              <InputFocus>
                <Input
                  type="text"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="Gasolina / Etanol"
                  id="combustivel"
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
                />
              </InputFocus>
            </InputSectionField>
            {/* {errors.km?.message && <p>{errors.km?.message}</p>} */}

            <InputSectionField>
              <Label htmlFor="cor" name="Cor" />
              <InputFocus>
                <Input type="text" className={InputStyles.basicInputWithBorder} placeholder="Branco" id="cor" />
              </InputFocus>
            </InputSectionField>
            {/* {errors.color?.message && <p>{errors.color?.message}</p>} */}
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
                  disabled
                />
              </InputFocus>
            </InputSectionField>
            {/* {errors.tablePife?.message && <p>{errors.tablePife?.message}</p>} */}

            <InputSectionField>
              <Label htmlFor="preco" name="Preço" />
              <InputFocus>
                <Input
                  type="number"
                  className={InputStyles.basicInputWithBorder}
                  placeholder="R$50.000,00"
                  id="preco"
                />
              </InputFocus>
            </InputSectionField>
            {/* {errors.price?.message && <p>{errors.price?.message}</p>} */}
          </div>

          <InputSectionField>
            <Label htmlFor="descricao" name="Descricao" />
            <InputFocus>
              <TextArea className={TextAreaStyles.basicTextAreaWithBorder} placeholder="Descrição" id="descricao" />
            </InputFocus>
          </InputSectionField>
          {/* {errors.description?.message && <p>{errors.description?.message}</p>} */}

          <InputSectionField>
            <Label htmlFor="published" name="Publicado" />

            <div className={styles.publishedButtonsDiv}>
              <Button className={ButtonStyles.grey10TextGrey1Button} text="Sim" type="button" />
              <Button className={ButtonStyles.brand1Button} text="Não" type="button" />
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
