import Image from "next/image";
import LoginForm from "./_component/LoginForm";
import SocialLogin from "./_component/SocialLogin";

export default function LoginPage() {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-1/2 h-full relative">
          <Image src="/images/Auth/auth_bg.png" alt="login_bg" fill />
        </div>
        {/* background image */}
        <div className="relative w-1/2 h-full flex flex-col justify-center items-center overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-contain bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/images/common/gradient_bg.png')" }}
          />
          {/* content */}
          <div className="relative z-10 flex flex-col items-center">
            <Image
              src="/images/common/logo.png"
              alt="logo"
              width={268}
              height={91}
            />
            <LoginForm />
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
}
