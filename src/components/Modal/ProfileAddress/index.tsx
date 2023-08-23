import { ProfileAddressSettings } from "@/components/Forms/ProfileAddressSettings";
import { Modal } from "../index";

export const ProfileAddressModal = () => {
  return (
    <Modal title="Editar endereço">
      <ProfileAddressSettings />
    </Modal>
  );
};
