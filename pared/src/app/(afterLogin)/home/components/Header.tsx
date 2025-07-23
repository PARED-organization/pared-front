// components/Header.tsx
"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full max-w-[1920px] flex items-center justify-between px-[210px] py-[22px]">
      <div className="flex items-center gap-[76px]">
        <Image
          src="/images/main/logo.svg"
          alt="RARED Logo"
          width={120}
          height={41}
        />
        <nav className="flex gap-[76px] text-[#222] text-[16px] font-medium font-[Pretendard]">
          <span>공지사항</span>
          <span>정보게시판</span>
          <span>자유게시판</span>
          <span>Q&A</span>
        </nav>
      </div>
      <div className="flex items-center gap-[20px]">
        <Image
          src="/images/main/alarm.svg"
          alt="Notification"
          width={58}
          height={58}
        />
        <span className="relative">
          <Image
            src="/images/main/profile.svg"
            alt="User Icon"
            width={61}
            height={58}
            className="rounded-b-[5px]"
          />
        </span>
      </div>
    </header>
  );
}
