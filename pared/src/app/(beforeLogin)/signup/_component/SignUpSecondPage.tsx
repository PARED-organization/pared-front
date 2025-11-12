'use client'
import { useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar"
import { updateUserInfo } from "../../login/_component/useSignUpStore";
import {  Pencil } from "lucide-react";
import Image from "next/image";
import WhiteCenterPage from "./WhiteCenterPage";
export default function SecondPage(){
    const {userInfoStep,setRole,setUserInfoStep,profilePic,setProfilePic,nickName,setNickName,userRole,therapistRole,setTherapistRole} = updateUserInfo();

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            const url = URL.createObjectURL(file)
            setProfilePic(url)
        }
    }

    const handleEditClick = ()=>{
        fileInputRef.current?.click()
    }
    
    return (
        <WhiteCenterPage>
            <div className="relative w-[140px] h-[140px] mt-[35px]">
                                        <Image
                                        src={profilePic}
                                        alt="profile"
                                        fill
                                        className="rounded-full object-cover"/>
                                        <button
                                            onClick={handleEditClick}
                                            className="absolute right-[10px] bottom-[10px] z-[200] bg-[white] w-[30px] h-[30px] p-1 rounded-full shadow hover:bg-[#EFEFEF] items-center justify-center flex flex-col">
                                            <Pencil size={16}/>
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            />
                                    </div>
                                    <input
                                        className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                                        type="text"
                                        placeholder="닉네임을 입력해주세요."
                                        value={nickName}
                                        onChange={(e)=>setNickName(e.target.value)}
                                        />
                                    {
                                        userRole === 'languageTherapist' && 
                                        <input
                                        className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                                        type="text"
                                        placeholder="직무를 입력해주세요."
                                        value={therapistRole}
                                        onChange={(e)=>setTherapistRole(e.target.value)}
                                        />
                                    }

                                        <div className="flex flex-row mt-[100px] items-center justify-between w-[420px] h-[44px]">
                                            <button type="button" className="bg-[#FFF] text-[#FF9466] w-[150px] rounded-[3px] h-[44px] border-[#FF9466] border-[1px]" onClick={()=>{setUserInfoStep(0);}}>
                                                이전으로
                                            </button>
                                            <button type="button" className="bg-[#FF9466] text-[white] w-[150px] rounded-[3px] h-[44px]" onClick={()=>{setUserInfoStep(2)}}>
                                                다음
                                            </button>
                                        </div>
        </WhiteCenterPage>
    )
}