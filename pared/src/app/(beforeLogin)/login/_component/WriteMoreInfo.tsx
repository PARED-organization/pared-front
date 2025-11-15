'use client'


import CheckBoxRound from "./CheckBoxRound"
import { updateSignUpBasis, useCheckBox } from "./useSignUpStore";
import { useModalStore } from "./useModalStore";
import { useRouter } from "next/navigation";
import { useEffect,useState,useRef } from "react";
import api from "./AxiosApi";
import axios from "axios";
export default function WriteMoreInfo(){

    const [timeLeft, setTimeLeft] = useState(5*60) // 5분 = 300초
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // 초 → 분:초 포맷
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
const handleStart = () => {
    // 이미 돌고 있으면 무시
    if (timerRef.current) return

    // 0초라면 리셋 후 시작
    if (timeLeft === 0) {
      setTimeLeft(5 * 60)
    }

    setIsRunning(true)

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }


 // 🧹 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // 초기화 (0이 되면 자동으로 멈춤)
  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimeLeft(5 * 60)
    setIsRunning(false)
  }

  const fullingTime = ()=>{
    setTimeLeft(5*60);
  }

    const {isEmailVerified,isEmailVerifiedHidden,setIsEmailVerified,setIsEmailVerifiedHidden,isVerifyClicked,setIsVerifyClicked,authStr,setAuthStr,email,isSameChecked,failedString,password,checkPassword,sameCheck,isLegalPassword,setSameCheck,setFailedString,setEmail,setPassword,setCheckPassword} = updateSignUpBasis();
    const {openModal} = useModalStore();
    const {getMarketingAgreed} = useCheckBox();
    const router = useRouter();
    
    const handleClick = ()=>{
        if(!isEmailVerified)
            openModal("이메일 인증이 되지 않았습니다.")
        else if(password != checkPassword)
            openModal("비밀번호와 비밀번호 확인이 같지 않습니다.")
        else if(password.length < 8)
            openModal("비밀번호가 8자리 미만입니다.")
        

        goNext();
        
    }

    const goNext = async ()=>{
        try{
            const res = await api.post("/api/v1/user/normal-sign-up",{
            email: email,
            password: password,
            isAgreeMarketingTerms: getMarketingAgreed()
        })

        if(res.data.status === "SUCCESS"){
            openModal("회원가입이 완료되었습니다. 다시 로그인해 주세요.",()=>{
                location.reload()
            })
        }else{
            openModal("에러가 발생하였습니다." + res.data.message);
        }
        } catch(error: any){
            if(error.response){
                const message = error.response.data?.message || "알 수 없는 오류가 발생했습니다."
                openModal("요청이 실패했습니다: "+message);
            }else{
                openModal("서버 연결에 실패했습니다.")
            }
        }
            
    }
        
        
     


    const sendEmail = async ()=>{
        try{
            const res = await api.post("/api/v1/user/send-verify-email",{
                email: email
            })

            if(res.data.data.successes === true){
                verify();
            }else{
                openModal("이메일 발송에 실패했습니다.");
                console.log(res);
            }
        } catch(err){
            console.error(err);
        }
    }

    const checkEmail = async ()=>{
        try{
            const res = await api.post("/api/v1/user/check-verify-code",{
                email: email,
                code: authStr
            })
            console.log(res.data.data);
            if(res.data.data.successes === true){
                setIsEmailVerifiedHidden(false);
                setFailedString("인증에 성공하였습니다.")
                setIsEmailVerified(true);
            }else{
                setIsEmailVerifiedHidden(false);
                setFailedString("코드가 일치하지 않습니다. 다시 시도해 주세요.");
                setIsEmailVerified(false);
            }
        } catch(err){
            console.error(err);
        }
    }

    

    const verify = ()=>{
        setIsVerifyClicked(false);
        //타이머가 시작하지 않았을 경우
        if(!isRunning){
            handleStart();
        }
        //타이머가 진행 중일 때 다시 눌렸을 경우
        else if(isRunning && timeLeft>0){
            fullingTime();
        }
        //타이머가 끝났을 때 다시 눌렀을 경우
        else{
            handleReset();
        }
    }
    return (
        <>
            <div className="flex flex-col gap-[10px] mt-[20px]">
                <h1 className="text-[24px] mt-[20px] font-[extrabold]">인증 방법을 선택해 주세요.</h1>

                

                <>
                    
                    <div className="flex flex-row items-center justify-between w-[420px] h-[44px]">
                        
                        <input
                        className="bg-[#fff] w-[300px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <button type="button" className="bg-[#FF9466] text-[white] w-[100px] rounded-[3px] h-[44px] cursor-pointer" onClick={sendEmail}>
                            본인인증   
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-between w-[420px] h-[44px]" hidden={isVerifyClicked}>
                        
                        <input
                        className="bg-[#fff] w-[300px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                        placeholder="인증번호 6자리를 입력하세요."
                        value={authStr}
                        onChange={(e)=>setAuthStr(e.target.value)}
                    />
                    <button type="button" className="bg-[#FF9466] text-[white] w-[100px] rounded-[3px] h-[44px] cursor-pointer" onClick={checkEmail}>
                            인증번호확인
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-between w-[420px]" hidden={isVerifyClicked}>
                        <span className={"font-[semibold] " + (isEmailVerified ? "text-[#47E10C]" : "text-[red]")} hidden={isEmailVerifiedHidden}>{failedString}</span>    
                        <span className="font-[semibold]" hidden={isVerifyClicked}>{formatTime(timeLeft)}</span>
                    </div>
                    
                </>
                
                
                

                <input
                    className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={checkPassword}
                    onChange={(e)=>setCheckPassword(e.target.value)}
                /> 
                
                <div className="flex flex-row items-center justify-between w-[420px]">
                    <span className="text-[10px]">비밀번호는 8자리 이상이여야 합니다.</span>        
                    {
                    password === checkPassword
                    ? <span className={"font-[10px] font-[semibold] text-[#47E10C]"} hidden={password.length<1}>비밀번호가 일치합니다.</span>
                    : <span className={"font-[10px] font-[semibold] text-[red]"} hidden={password.length<1}>비밀번호가 일치하지 않습니다.</span>
                    }
                </div>
                
                <button
                    className="bg-[#FF9466] text-[white] w-[420px] h-[44px] border-[#D9D9D9] rounded-[4px] pl-[25px]"
                    onClick={handleClick}
                    >
                        다음
                    </button>
                
            </div>
        </>
    );
}