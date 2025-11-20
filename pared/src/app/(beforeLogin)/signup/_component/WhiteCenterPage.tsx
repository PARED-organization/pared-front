'use client'

import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { updateUserInfo } from "../../login/_component/useSignUpStore";

export default function WhiteCenterPage({children}){
    const {userInfoStep,userRole} = updateUserInfo();
    const maxValue  = (userRole==='parent' ? 25 : 20);
    return(
        <>
        <div className="z-[150] absolute left-1/2 -translate-x-1/2 items-center justify-center mt-[100px]">
                                 <ProgressBar
                                    completed={maxValue*userInfoStep}
                                    maxCompleted={100}
                                    height="20px"
                                    width="700px"
                                    borderRadius="50px"
                                    isLabelVisible={false}
                                    baseBgColor="#D9D9D9"
                                    bgColor="#FF9466"/>
                                <div className="bg-[#fff]  rounded-[24px] shadow-[24px] p-10 flex flex-col items-center w-[700px] h-[500px] max-w-sm mt-[10px] gap-[10px]">
                                    {children}
                                </div>
                            </div>
        </>
    )
}