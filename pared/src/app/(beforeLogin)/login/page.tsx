'use client'
import Image from "next/image";
import LoginForm from "./_component/LoginForm";
import SocialLogin from "./_component/SocialLogin";
import PolicyForm from "./_component/PolicyForm";
import ParedModal from "./_component/ParedModal";
import WriteMoreInfo from "./_component/WriteMoreInfo";
import { signUpInfo } from "./_component/useSignUpStore";



export default function LoginPage() {
  const {step,isGeneral,setStep,setGeneral} = signUpInfo();
  return (

    <div className=" flex w-full h-screen bg-white">
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
        <div className="bg-[#fff]  rounded-[24px] shadow-[24px] p-10 flex flex-col items-center w-[500px] h-[700px] max-w-sm overflow-y-auto">
          {
            step === 1 && (
              <>
               <Image
              src="/images/common/new_logo.png"
              alt="logo"
              width={520}
              height={91}
              className="mt-[24px] mb-6"
            />
            <LoginForm />
            <SocialLogin />
              </>
            )  
          }
          {
            step === 2 && (
              <PolicyForm/>
            )
          }
          {
            step === 3 && (
              <>
                {<WriteMoreInfo/>}
              </>
            )
          }
            
        </div>
      </div>
        <ParedModal/>
    </div>
  );
}
