import { CreateAnnounceModalForm } from "@/components/Forms/CreateAnnounce";
import { Modal } from "../index";
export const CreateAnnounceModal = () => {
  return (
    <Modal title="Criar Anúncio">
      <CreateAnnounceModalForm />
    </Modal>
  );
};
