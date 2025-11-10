// store/useModalStore.ts
import { create } from "zustand";

interface ModalState {
  message: string | null;
  show: boolean;
  openModal: (msg: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  message: null,
  show: false,
  openModal: (msg) => set({ show: true, message: msg }),
  closeModal: () => set({ show: false, message: null }),
}));
