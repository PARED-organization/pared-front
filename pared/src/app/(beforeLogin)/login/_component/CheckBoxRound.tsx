import React from "react";

type Props = {
    checked:boolean;
    onChange: (v:boolean) => void;
    label?: string;
    size?: "sm"|"md"|"lg";
    disabled?: boolean;
};

const sizeMap = {
  sm: "w-[5px] m-[5px]",      // 20px
  md: "w-[5px] m-[7px]",      // 28px
  lg: "w-[9px] m-[9px]",      // 36px
}

export default function CheckBoxRound({
    checked,
    onChange,
    label,
    size = "md",
    disabled,
} : Props){
    return (
    <label className="inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="sr-only peer"
  />
  <span
    className="
      w-[20px] h-[20px] rounded-full border-2
      border-[#EFEFEF] bg-white
      grid place-items-center transition
      peer-checked:bg-[#FF9466] peer-checked:border-[#FF9466]
    "
  >
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 text-white opacity-100 transition peer-checked:opacity-100"
    >
      <path
        fill="white"
        d="M20.285 6.709a1 1 0 0 1 .006 1.414l-9 9a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l8.293-8.293a1 1 0 0 1 1.414 .416z"
      />
    </svg>
  </span>
</label>

  );
}