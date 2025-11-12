import Image from "next/image"

export default function WaitingScreen(){
    return(
        <>
            <div className="z-[150] absolute  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <Image
                        src="/images/common/wheel.png"
                        alt="wheel_bg"
                        width={100}
                        height={100}
                        priority
                        className="ml-[75px]"
                    />
                    <Image
                        src="/images/common/new_logo.png"
                        alt="logo"
                        width={250}
                        height={91}
                        priority
                    />
                        <h1 className="text-[30px] mt-[12px] font-[extrabold]">잠시만 기다려주세요.</h1>
                </div>
        </>
    );
}