import { ModalCreateCar } from "@/components/Modal/Modal";
import { ModalContext } from "@/contexts/Modal";
import { useContext } from "react";

export default function HomePage() {
  const { showModal, setShowModal } = useContext(ModalContext);

  const handleModalOpen = () => {
    setShowModal("createContact");
  };

  return (
    <main>
      <section>
        <h1>Titulo ficticio</h1>

        {showModal === "palavraChave" && <ModalCreateCar />}

        <button type="button" onClick={() => handleModalOpen()}>
          Abrir modal
        </button>
      </section>
    </main>
  );
}
