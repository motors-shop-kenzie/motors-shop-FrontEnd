import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputFocus } from "@/components/Input/InputFocus";
import { InputSectionField } from "@/components/InputSectionField";
import { Label } from "@/components/Label";
import { useModal } from "@/hooks/modalHook";
import { useAuth } from "@/hooks/useAuth.hook";
import { useForm } from "react-hook-form";
import ButtonStyles from "../../Button/styles.module.scss";
import InputStyles from "../../Input/styles.module.scss";
import styles from "../styles.module.scss";

export const ProfileAddressSettings = () => {
  const { user, editUserAddress } = useAuth();
  const { closeModal } = useModal();

  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    editUserAddress(data);
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(submit)}>
        <h2>Informações pessoais</h2>
        <div className={styles.inputsSectionModal}>
          <InputSectionField>
            <Label htmlFor="cepSettings" name="CEP" />
            <InputFocus>
              <Input
                type="text"
                value={user!.address!.zip_code}
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address!.zip_code}
                register={register("zip_code")}
                id="cepSettings"
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="stateSettings" name="Estado" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address.state}
                id="stateSettings"
                value={user!.address.state}
                register={register("state")}
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="citySettings" name="Cidade" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address.city}
                value={user!.address.city}
                register={register("city")}
                id="citySettings"
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="streetSettings" name="Rua" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address.street}
                value={user!.address.street}
                register={register("street")}
                id="streetSettings"
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="numberSettings" name="Número" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address.number}
                value={user!.address.number}
                register={register("number", { valueAsNumber: true })}
                id="numberSettings"
              />
            </InputFocus>
          </InputSectionField>

          <InputSectionField>
            <Label htmlFor="complementSettings" name="Complemento" />
            <InputFocus>
              <Input
                type="text"
                className={InputStyles.basicInputWithBorder}
                placeholder={user!.address.complement}
                value={user!.address.complement}
                register={register("complement")}
                id="complementSettings"
              />
            </InputFocus>
          </InputSectionField>

          <section className={styles.finalButtonsDivModal}>
            <Button onClick={() => closeModal()} className={ButtonStyles.grey6TextDarkButton} text="Cancelar" />
            <Button className={ButtonStyles.brand3TextBrand4Button} text="Salvar alterações" type="submit" />
          </section>
        </div>
      </form>
    </div>
  );
};
