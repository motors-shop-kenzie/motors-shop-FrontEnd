import { Modal } from "../index";
import { ProfileSettings } from "@/components/Forms/ProfileSettings";
export const ProfileSettingsModal = () => {
  return (
    <Modal title="Editar perfil">
      <ProfileSettings />
    </Modal>
  );
};
