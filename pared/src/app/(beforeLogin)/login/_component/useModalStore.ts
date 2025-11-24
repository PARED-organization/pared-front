import { create } from "zustand";

interface ModalConfig {
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

interface ModalState {
  message: string | null;
  show: boolean;
  config: ModalConfig | null;
  openModal: (msg: string, config?: ModalConfig) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  message: null,
  show: false,
  config: null,

  openModal: (msg, config) =>
    set({
      show: true,
      message: msg,
      config: config ?? null,
    }),

  closeModal: () =>
    set({
      show: false,
      message: null,
      config: null,
    }),
}));
