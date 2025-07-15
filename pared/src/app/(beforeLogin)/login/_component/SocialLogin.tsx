import Image from "next/image";

export default function SocialLogin() {
  return (
    <>
      <div className="flex flex-col gap-[10px] mt-[24px]">
        <div className="flex items-center gap-[14px]">
          <div className="flex-1 h-px bg-[#D9D9D9]"></div>
          <p className="text-sm text-[#D9D9D9] whitespace-nowrap">또는</p>
          <div className="flex-1 h-px bg-[#D9D9D9]"></div>
        </div>

        <button className="relative w-[420px] h-[44px] border border-[#D9D9D9] text-[#222222] rounded-[4px] flex items-center justify-center cursor-pointer">
          <div className="absolute left-[85px]">
            <Image
              src="/images/Auth/google_icon.svg"
              alt="google_icon"
              width={24}
              height={24}
            />
          </div>
          GOOGLE 계정으로 회원가입
        </button>

        <button className="relative w-[420px] h-[44px] bg-[#FEE500] text-[#222222] rounded-[4px] flex items-center justify-center cursor-pointer">
          <div className="absolute left-[90px]">
            <Image
              src="/images/Auth/kakao_icon.svg"
              alt="kakao_icon"
              width={20}
              height={20}
            />
          </div>
          KAKAO 계정으로 회원가입
        </button>

        <button className="relative w-[420px] h-[44px] bg-[#5BC55F] text-[#fff] rounded-[4px] flex items-center justify-center cursor-pointer">
          <div className="absolute left-[90px]">
            <Image
              src="/images/Auth/naver_icon.svg"
              alt="naver_icon"
              width={17}
              height={15}
            />
          </div>
          NAVER 계정으로 회원가입
        </button>
      </div>
    </>
  );
}
