'use client'

import WhiteCenterPage from "./WhiteCenterPage";
import { updateUserInfo } from "../../login/_component/useSignUpStore";
export default function ThirdPage(){
    const {setUserInfoStep,setInfomation,infomation} = updateUserInfo();
    return(
        <WhiteCenterPage>
            <div>
                <textarea name="info" value={infomation} onChange={(e)=>setInfomation(e.target.value)} className="w-[420px] h-[350px] border p-[10px] rounded-[4px] border-[#D9D9D9] mt-[35px] resize-none" placeholder="자유롭게 소개글을 작성해주세요."/>
                <div className="flex flex-row mt-[20px] items-center justify-between w-[420px] h-[44px]">
                                            <button type="button" className="bg-[#FFF] text-[#FF9466] w-[150px] rounded-[3px] h-[44px] border-[#FF9466] border-[1px]" onClick={()=>{setUserInfoStep(1);}}>
                                                이전으로
                                            </button>
                                            <button type="button" className="bg-[#FF9466] text-[white] w-[150px] rounded-[3px] h-[44px]" onClick={()=>{setUserInfoStep(3)}}>
                                                다음
                                            </button>
                                        </div>
            </div>
        </WhiteCenterPage>
    )
}