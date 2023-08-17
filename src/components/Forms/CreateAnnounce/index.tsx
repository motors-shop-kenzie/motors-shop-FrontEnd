import { InputSectionField } from "@/components/InputSectionField";
import styles from "../styles.module.scss";
import { InputFocus } from "@/components/Input/InputFocus";
import { Input } from "@/components/Input";

import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";

import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";

export const CreateAnnounceModalForm = () => {
  return (
    <div className={styles.modalContainer}>
      <form>
        <h2 className={styles.subtitleModal}>Informações do veículo</h2>
        <div className={styles.inputsSectionModal}>
          <InputSectionField>
            <Label htmlFor="marca" name="Marca" />
            <InputFocus>
              <Select name="Marca selecione" id="marca">
                <option value="Chevrolet">Chevrolet</option>
              </Select>
            </InputFocus>
          </InputSectionField>
          <InputSectionField>
            <Label htmlFor="modelo" name="Modelo" />
            <InputFocus>
              <Select name="Modelo" id="modelo">
                <option value="camaro ss 6.2 v8 16v">
                  camaro ss 6.2 v8 16v
                </option>
              </Select>
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
