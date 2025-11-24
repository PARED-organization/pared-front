"use client";

import Modal from "react-modal";
import { useModalStore } from "./useModalStore";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
    
  },
  content: {
    width: "360px",
    height: "200px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "white",
  },
};

export default function ParedModal() {
  const { message, show, closeModal, config } = useModalStore();

  const handleConfirm = () => {
    if (config?.onConfirm) config.onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (config?.onCancel) config.onCancel();
    closeModal();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={closeModal}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop Up message"
      shouldCloseOnOverlayClick={true}
    >
      <div
        className="flex flex-col bg-white rounded-2xl shadow-xl items-center justify-between h-[150px] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[17px] mt-[30px]">{message}</p>

        {/* 버튼 영역 */}
        <div className="flex gap-3 mb-4 w-full px-3">
          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#FF9466] text-white rounded-[6px] h-[40px]"
          >
            확인
          </button>
          {/* 취소 버튼 (옵션) */}
          {config?.showCancelButton && (
            <button
              onClick={handleCancel}
              className="flex-1 border border-[#FF9466] text-[#FF9466] rounded-[6px] h-[40px]"
            >
              취소
            </button>
          )}

          
        </div>
      </div>
    </Modal>
  );
}
