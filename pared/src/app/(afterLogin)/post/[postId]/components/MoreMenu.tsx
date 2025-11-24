"use client";

import { useState, useRef, useEffect, JSX } from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  Flag,
  Link as LinkIcon,
} from "lucide-react";

interface MoreMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onCopyLink?: () => void;
}

export default function MoreMenu({
  onEdit,
  onDelete,
  onReport,
  onCopyLink,
}: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /** 메뉴 외부 클릭 → 닫기 */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /** 동적으로 생성할 버튼 목록 */
  const menuItems = [
    onEdit && {
      label: "글 수정",
      icon: <Edit size={16} />,
      onClick: onEdit,
      className: "",
    },
    onDelete && {
      label: "글 삭제",
      icon: <Trash2 size={16} />,
      onClick: onDelete,
      className: "text-[red]",
    },
    onReport && {
      label: "글 신고",
      icon: <Flag size={16} />,
      onClick: onReport,
      className: "text-[red]",
    },
    onCopyLink && {
      label: "링크 복사",
      icon: <LinkIcon size={16} />,
      onClick: onCopyLink,
      className: "",
    },
  ].filter(Boolean) as {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
    className?: string;
  }[];

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
      {open && menuItems.length > 0 && (
        <div className="absolute right-0 mt-2 w-[120px] bg-white rounded-lg shadow-lg border border-[#FF9466] rounded-[2px] z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className={`flex items-center gap-2 w-full h-[36px] px-3 py-2 text-left border-b-1 border-[#FF9466] hover:bg-gray-100 ${item.className}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
