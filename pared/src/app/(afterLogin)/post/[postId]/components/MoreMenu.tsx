"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2, Flag, Link as LinkIcon } from "lucide-react";

interface MoreMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onCopyLink?: () => void;
}

export default function MoreMenu({ onEdit, onDelete, onReport, onCopyLink,className }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /** 클릭 바깥 감지 → 메뉴 닫기 */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="ml-[20px] relative inline-block" ref={menuRef}>
      {/* ... 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded hover:bg-gray-100 transition"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* 메뉴 팝오버 */}
      {open && (
        <div className="absolute right-0 mt-2 w-[100px] bg-white rounded-lg shadow-lg border z-50">
          <button
            onClick={() => { setOpen(false); onEdit?.(); }}
            className="flex items-center gap-2 h-[35px] w-full px-3 py-2 text-left hover:bg-gray-100"
          >
            <Edit size={16} /> 글 수정
          </button>

          <button
            onClick={() => { setOpen(false); onDelete?.(); }}
            className="flex items-center gap-2 w-full h-[35px] px-3 py-2 text-left hover:bg-gray-100 text-red-600"
          >
            <Trash2 size={16} /> 글 삭제
          </button>

          <button
            onClick={() => { setOpen(false); onReport?.(); }}
            className="flex items-center gap-2 w-full h-[35px] px-3 py-2 text-left text-[red] hover:bg-gray-100"
          >
            <Flag size={16} /> 글 신고
          </button>

          <button
            onClick={() => { setOpen(false); onCopyLink?.(); }}
            className="flex items-center gap-2 w-full h-[35px] px-3 py-2 text-left hover:bg-gray-100"
          >
            <LinkIcon size={16} /> 링크 복사
          </button>
        </div>
      )}
    </div>
  );
}
