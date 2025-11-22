"use client";

import { useState } from "react";

interface LikeButtonProps {
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
}

export default function LikeButton({ initialLiked = false, onToggle }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    const newValue = !liked;
    setLiked(newValue);
    onToggle?.(newValue);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center gap-2
        p-[10px]
        rounded-[4px] 
        font-medium
        cursor-pointer
        transition
        hover:animate-twinkle
        ${liked ?  "bg-[#F3F3F3]":"bg-[#E45A5A] text-[white]" }
      `}
    >
      {/* Heart Icon */}
      <span className="text-lg">
        {liked ? "🤍" :"❤️"  }
      </span>

      {liked ? "좋아요 취소" :  "좋아요"}
    </button>
  );
}
