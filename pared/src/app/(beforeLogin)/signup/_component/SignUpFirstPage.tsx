import Image from "next/image";
import { updateUserInfo } from "../../login/_component/useSignUpStore";
export default function FirstPage(){
    const {userInfoStep,setRole,setUserInfoStep} = updateUserInfo();
    return (
        <>

                        <div className="relative z-10 flex flex-row items-center px-4 mx-auto justify-center">
                            <div className="bg-[#fff]  rounded-[24px] shadow-[24px] p-10 flex flex-col items-center w-[450px] h-[600px] max-w-sm ml-[400px] mt-[150px] hover:border-[3px] hover:border-[#FF9466]" onClick={()=>{setRole('parent');setUserInfoStep(1)}}>
                                <h1 className="text-[24px] mt-[50px] font-[extrabold]">부모님</h1>
                                <Image
                                    src="/images/common/parents.png"
                                    alt="parents"
                                    width={375}
                                    height={292}
                                    priority
                                    className="mt-[50px]"
                                    />
                            </div>
                            <div className="bg-[#fff]  rounded-[24px] shadow-[24px] p-10 flex flex-col items-center w-[450px] h-[600px] max-w-sm ml-[100px] mt-[150px] hover:border-[3px] hover:border-[#FF9466]" onClick={()=>{setRole('languageTherapihst');setUserInfoStep(1)}}>
                                <h1 className="text-[24px] mt-[50px] font-[extrabold]">언어치료 종사자</h1>
                                <Image
                                    src="/images/common/lang_therapyst.png"
                                    alt="parents"
                                    width={309}
                                    height={218}
                                    priority
                                    className="mt-[100px]"
                                    />
                            </div>
                        </div>
                            </>
    )
}