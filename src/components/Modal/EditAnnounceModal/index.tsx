import { Modal } from "../index";
import EditAnnounceModalForm from "@/components/Forms/EditAnnounce";

export const EditAnnounceModal = () => {
  return (
    <Modal title="Editar Anúncio">
      <EditAnnounceModalForm />
    </Modal>
  );
};
