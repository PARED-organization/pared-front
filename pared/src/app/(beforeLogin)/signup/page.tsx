'use client'
import WaitingScreen from "../login/_component/WaitingScreen"
import Image from "next/image"
import {useState,useEffect} from "react";
import { updateUserInfo } from "../login/_component/useSignUpStore";
export default function signUpPage(){
    const [isWaiting,setIsWaiting] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsWaiting(false);
        },2500);
    })

    const {userInfoStep,setRole,setUserInfoStep} = updateUserInfo();
    return (
        <>
            <div className="flex w-full h-screen bg-white">
                <div
                    className="absolute inset-0  w-full h-full bg-no-repeat bg-center bg-cover z-0"
                    style={{ backgroundImage: "url('/images/common/gradient_bg.png')" }}
                />
                {
                isWaiting
                    ?<WaitingScreen/>
                    : 
                    <div>
                        {
                            userInfoStep === 0 
                            &&
                            <>
                            <div className="absolute top-[30px] left-[30px] z-[100]">
                            <Image
                                                    src="/images/common/new_logo.png"
                                                    alt="logo"
                                                    width={150}
                                                    height={71}
                                                    priority
                                                />
                        </div>

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
                        }
                        
                    </div>
                }
            </div>
        </>
    )
}