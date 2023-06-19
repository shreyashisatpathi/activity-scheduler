import { create } from 'zustand'

interface activityModalStore {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void,

}

const useActivityModal = create<activityModalStore>((set) => ({
    isOpen: false,
    openModal: () => {
        set({ isOpen: true })
    },
    closeModal: () => {
        set({ isOpen: false })
    }
}))

export default useActivityModal;
