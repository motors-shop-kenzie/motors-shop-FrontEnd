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
import { useAuth } from "@/hooks/useAuth.hook";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export const ProfileSettings = () => {
  const { user, patchUser, destroyUser } = useAuth();
  const { closeModal } = useModal();

  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    patchUser(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.container__profileSettingsForm}>
      <h2>Informações pessoais</h2>
      <InputSectionField>
        <Label htmlFor="NameSettings" name="Nome" />
        <InputFocus>
          <Input
            type="text"
            value={user?.name}
            className={InputStyles.basicInputWithBorder}
            placeholder={user!.name}
            register={register("name")}
            id="NameSettings"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="EmailSettings" name="Email" />
        <InputFocus>
          <Input
            type="text"
            className={InputStyles.basicInputWithBorder}
            placeholder={user!.email}
            id="EmailSettings"
            value={user!.email}
            register={register("email")}
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="cpfSettings" name="CPF" />
        <InputFocus>
          <Input
            type="text"
            className={InputStyles.basicInputWithBorder}
            placeholder={user!.cpf}
            value={user!.cpf}
            register={register("cpf")}
            id="cpfSettings"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="phoneSettings" name="Celular" />
        <InputFocus>
          <Input
            type="text"
            className={InputStyles.basicInputWithBorder}
            placeholder={user!.telephone}
            value={user!.telephone}
            register={register("telephone")}
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
            placeholder={user!.birthdate}
            value={user!.birthdate}
            register={register("birthdate")}
            id="birthDateSettings"
          />
        </InputFocus>
      </InputSectionField>

      <InputSectionField>
        <Label htmlFor="descriptionSettings" name="Descricao" />
        <InputFocus>
          <TextArea
            className={TextAreaStyles.basicTextAreaWithBorder}
            placeholder={user!.description!}
            value={user!.description}
            register={register("description")}
            id="descriptionSettings"
          />
        </InputFocus>
      </InputSectionField>
      <div className={styles.container__divProfileSettings}>
        <Button onClick={() => closeModal()} className={ButtonStyles.grey6TextDarkButton} text="Cancelar" />
        <Button
          onClick={() => destroyUser()}
          className={ButtonStyles.feedbackAlert3TextFeedbackAlert1Button}
          text="Excluir Perfil"
        />
        <Button className={ButtonStyles.brand3TextBrand4Button} text="Salvar alterações" type="submit" />
      </div>
    </form>
  );
};
