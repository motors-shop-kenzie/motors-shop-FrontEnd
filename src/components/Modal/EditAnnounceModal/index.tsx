import EditAnnouncementForm from "@/components/Forms/EditAnnouncement";
import { Modal } from "../index";

export const EditAnnounceModal = () => {
  return (
    <Modal title="Editar Anúncio">
      <EditAnnouncementForm />
    </Modal>
  );
};
