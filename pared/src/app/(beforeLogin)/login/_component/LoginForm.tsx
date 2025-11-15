'use client'

import { useModalStore } from "./useModalStore";
import { signUpInfo } from "./useSignUpStore";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "./AxiosApi";
export default function LoginForm() {
  const {step,isGeneral,setStep,setGeneral} = signUpInfo();
  const {openModal} = useModalStore();
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

   const login = async ()=>{
      try{
        const res = await api.post("/api/v1/user/login",{
          email,
          password
        },{
          withCredentials: true
        })

        if(res.status === 200){
            //router.push('/home');
            openModal("로그인에 성공하였습니다.")
        }else{
          openModal("이메일 혹은 비밀번호가 일치하지 않습니다.")
        }
      }catch(err){
        openModal("이메일 혹은 비밀번호가 일치하지 않습니다.")
        console.error(err);
      }
   }

  return (
    <>
      <div className="flex flex-col gap-[10px] mt-[50px]">
        <input
          className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        
        <button className="w-[420px] h-[44px] bg-[#FF9466] text-[#fff] rounded-[4px] cursor-pointer font-medium text-[15px]" onClick={login}>
          로그인
        </button>

        <button type='button' className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] text-[#222222] rounded-[4px] cursor-pointer font-medium text-[15px]" onClick={()=>{setStep(2); setGeneral(true)}}>
          회원가입
        </button>
      </div>
    </>
  );
}
