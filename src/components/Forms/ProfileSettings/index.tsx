import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { TextArea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { useModal } from "@/hooks/modalHook";
import InputStyles from "../../Input/styles.module.scss";
import TextAreaStyles from "../../Textarea/style.module.scss";
import ButtonStyles from "../../Button/styles.module.scss";
import styles from "./styles.module.scss";

export const ProfileSettings = () => {
  const { closeModal } = useModal();
  return (
    <form className={styles.container__profileSettingsForm}>
      <h2>Informações pessoais</h2>
      <InputSectionField>
        <Label htmlFor="NameSettings" name="Nome" />
        <InputFocus>
          <Input type="text" className={InputStyles.basicInputWithBorder} placeholder="Name" id="NameSettings" />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="EmailSettings" name="Email" />
        <InputFocus>
          <Input type="text" className={InputStyles.basicInputWithBorder} placeholder="Email" id="EmailSettings" />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="cpfSettings" name="CPF" />
        <InputFocus>
          <Input type="text" className={InputStyles.basicInputWithBorder} placeholder="CPF" id="cpfSettings" />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="phoneSettings" name="Celular" />
        <InputFocus>
          <Input
            type="text"
            className={InputStyles.basicInputWithBorder}
            placeholder="(11) 91111-1111"
            id="phoneSettings"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="birthDateSettings" name="Data de nascimento" />
        <InputFocus>
          <Input
            type="text"
            className={InputStyles.basicInputWithBorder}
            placeholder="01/01/1111"
            id="birthDateSettings"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="descriptionSettings" name="Descricao" />
        <InputFocus>
          <TextArea
            className={TextAreaStyles.basicTextAreaWithBorder}
            placeholder="Descrição"
            id="descriptionSettings"
          />
        </InputFocus>
      </InputSectionField>
      <div className={styles.container__divProfileSettings}>
        <Button onClick={() => closeModal()} className={ButtonStyles.grey6TextDarkButton} text="Cancelar" />
        <Button className={ButtonStyles.feedbackAlert3TextFeedbackAlert1Button} text="Excluir Perfil" />
        <Button className={ButtonStyles.brand3TextBrand4Button} text="Salvar alterações" type="submit" />
      </div>
    </form>
  );
};
