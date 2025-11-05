import Image from "next/image";
import LoginForm from "./_component/LoginForm";
import SocialLogin from "./_component/SocialLogin";

export default function LoginPage() {
  return (
    <div className="relative flex w-full h-screen bg-white overflow-hidden">
      <div
          className="absolute inset-0  w-full h-full bg-no-repeat bg-center bg-cover z-0"
          style={{ backgroundImage: "url('/images/common/gradient_bg.png')" }}
        />
         {/* LEFT: illustration */}
      <div className="w-1/2 h-full relative">
        <Image
          src="/images/Auth/new_auth_bg.png"
          alt="login_bg"
          fill
          priority
          className="object-contain object-center p-6"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center px-4 mx-auto justify-center  w-2/3 max-w-sm">
        <div className="bg-[#fff]  rounded-2xl shadow-2xl p-10 flex flex-col items-center w-1/2 max-w-sm">
          <Image
              src="/images/common/logo.png"
              alt="logo"
              width={268}
              height={91}
              className="mt-[24px] mb-6"
            />
            <LoginForm />
            <SocialLogin />
        </div>
      </div>

    </div>
  );
}
