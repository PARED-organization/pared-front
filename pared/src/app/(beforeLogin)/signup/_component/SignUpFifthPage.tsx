import WhiteCenterPage from "./WhiteCenterPage";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function FifthPage(){
    const router = useRouter();
    return(
        <WhiteCenterPage>
            <>
                <Image
                src="/images/common/new_logo.png"
                    width={520}
                    height={91}
                    priority
                    
              alt="logo"
              className="mt-[50px]"
                    />
                    <span className="text-[20px] text-[semibold] mt-[20px]">회원가입을 축하합니다!</span>
                    <div className="flex flex-row mt-[20px] items-center justify-center w-[420px] h-[44px]">
                                            <button type="button" className="bg-[#FF9466] text-[white] w-[150px] rounded-[3px] h-[44px]" onClick={()=>{router.push("/home")}}>
                                                처음으로
                                            </button>
                                        </div>

            </>
        </WhiteCenterPage>
    )
}