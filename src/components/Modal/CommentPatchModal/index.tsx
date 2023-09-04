import { Modal } from "../index";
import { PatchComments } from "@/components/Forms/PatchComments";

export const CommentPatchModal = () => {
  return (
    <Modal title="Editar comentário">
      <PatchComments />
    </Modal>
  );
};
