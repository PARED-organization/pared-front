// store/useModalStore.ts
import { create } from "zustand";

interface ModalState {
  message: string | null;
  show: boolean;
  openModal: (msg: string,onClose?:()=>void) => void;
  closeModal: () => void;
  onCloseCallBack?: ()=>void;
}

export const useModalStore = create<ModalState>((set,get) => ({
  message: null,
  show: false,
  onCloseCallBack: undefined,
  openModal: (msg,onClose) => set({ show: true, message: msg,onCloseCallBack:onClose }),
  closeModal: () => {
    const cb = get().onCloseCallBack;
    if(cb) cb();
    set({show:false, message:null, onCloseCallBack:undefined})
  }
  
}));
