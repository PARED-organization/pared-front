import { useState } from "react";

interface YoutubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

export default function YoutubeModal({ isOpen, onClose, onSubmit }: YoutubeModalProps) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 items-center justify-center bg-[#F3F3F3] flex z-50">
      <div className="bg-white p-[10px] rounded-md shadow-md w-[300px] border border-[#FF9466] rounded-[4px]">
        <h2 className="font-semibold text-lg mb-2">YouTube 링크 입력</h2>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtu.be/xxxx"
          className="w-full border px-[4px] py-[2px] rounded-md mb-[3px]"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-[6px] py-[2px] bg-[white] border border-[#FF9466] rounded-[4px] hover:bg-[#FF9466]"
            onClick={() => {
              setUrl("");
              onClose();
            }}
          >
            취소
          </button>

          <button
            className="ml-[10px] px-[6px] py-[2px] bg-[white] border border-[#FF9466] rounded-[4px] hover:bg-[#FF9466]"
            onClick={() => {
              if (url.trim().length === 0) return;
              onSubmit(url);
              setUrl("");
              onClose();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
