'use client'

import Modal from 'react-modal'
import { useModalStore } from './useModalStore';
/*overlay는 모달 창 바깥 부분을 처리하는 부분이고,
content는 모달 창부분이라고 생각하면 쉬울 것이다*/
const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
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
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
};

export default function ParedModal(){
  const {message,show,closeModal,openModal} = useModalStore();
    return(
        <Modal
          isOpen={show}
          onRequestClose={()=>closeModal}
          style={customModalStyles}
          ariaHideApp={false}
          contentLabel='Pop Up message'
          shouldCloseOnOverlayClick={true}
        >
          <div
            className=" flex flex-col bg-white rounded-2xl shadow-2xl items-center justify-between h-[150px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[17px] mb-6 mt-[50px]">{message}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white rounded-[2px]  w-[320px] bg-[#FF9466] h-[40px]"
            >
              확인
            </button>
          </div>
        </Modal>
    )
}