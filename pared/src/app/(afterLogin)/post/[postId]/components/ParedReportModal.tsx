"use client";

import Modal from "react-modal";
import Image from "next/image";
import { useReportModalStore } from "./ReportModalState";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "400px",
    height: "380px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    backgroundColor: "white",
    padding: "0px",
  },
};

export default function ParedReportModal() {
  const {
    show,
    reportUser,
    reportContent,
    closeReportModal,
    setReportContent,
    onSubmit,
  } = useReportModalStore();

  const handleSubmit = () => {
    if (onSubmit) onSubmit(reportContent);
    closeReportModal();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={closeReportModal}
      ariaHideApp={false}
      style={customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className="flex flex-col bg-white rounded-xl shadow-lg p-5 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 신고 대상 정보 */}
        <div className="flex items-center gap-3 mb-4">
          {reportUser && (
            <>
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                <Image
                  src={reportUser.profilePic}
                  alt="profile"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-[18px] font-bold">
                {reportUser.nickname} 님 신고하기
              </div>
            </>
          )}
        </div>

        {/* 신고 내용 입력 */}
        <textarea
          className="flex-grow rounded-xl p-[5px] resize-none outline-none text-[15px]"
          placeholder="신고 사유를 입력해주세요."
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
        />

        {/* 버튼 */}
        <div className="flex gap-3 mt-4">
            <button
            onClick={handleSubmit}
            className="flex-1 bg-[#FF9466] text-white rounded-lg h-[40px]"
          >
            전송
          </button>
          <button
            onClick={closeReportModal}
            className="flex-1 border border-[#FF9466] text-[#FF9466] rounded-lg h-[40px]"
          >
            취소
          </button>

          
        </div>
      </div>
    </Modal>
  );
}
