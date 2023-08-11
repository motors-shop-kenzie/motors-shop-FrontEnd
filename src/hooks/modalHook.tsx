import { ModalContext } from "@/contexts/Modal"
import { useContext } from "react"

export const useModal = () => {
    const modalContext = useContext(ModalContext)

    return modalContext
}