import Image from "next/image";
import LoginForm from "./_component/LoginForm";
import SocialLogin from "./_component/SocialLogin";

export default function LoginPage() {
    return (
        <>
        <div className="flex w-full h-screen">
            <div className="w-1/2 h-full relative">
                <Image src="/images/auth/auth_bg.png" alt="login_bg" fill />
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <Image src="/images/common/logo.png" alt="logo" width={268} height={91} />
                <LoginForm />
                <SocialLogin />
            </div>
        </div>
        </>
    )
}