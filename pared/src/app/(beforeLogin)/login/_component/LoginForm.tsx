'use client'

import { useModalStore } from "./useModalStore";

export default function LoginForm() {
  const {openModal} = useModalStore();
  return (
    <>
      <form className="flex flex-col gap-[10px] mt-[50px]">
        <input
          className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
          type="text"
          placeholder="이메일"
        />
        <input
          className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
          type="password"
          placeholder="비밀번호"
        />
        <button className="w-[420px] h-[44px] bg-[#FF9466] text-[#fff] rounded-[4px] cursor-pointer font-medium text-[15px]">
          로그인
        </button>
        <button type='button' className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] text-[#222222] rounded-[4px] cursor-pointer font-medium text-[15px]" onClick={()=>openModal("필수 약관에 모두 동의해야 합니다.")}>
          회원가입
        </button>
      </form>
    </>
  );
}
