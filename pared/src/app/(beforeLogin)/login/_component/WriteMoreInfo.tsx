import CheckBoxRound from "./CheckBoxRound"
import { updateSignUpBasis } from "./useSignUpStore";
import { useModalStore } from "./useModalStore";
import { useRouter } from "next/navigation";
export default function WriteMoreInfo(){

    const {loginTypeIsEmail,loginTypeIsPhoneNumber,emailCheck,phoneNumberCheck,phoneNumber,email,isSameChecked,failedString,password,checkPassword,sameCheck,isLegalPassword,setSameCheck,setFailedString,setEmail,setPassword,setCheckPassword} = updateSignUpBasis();
    const {openModal} = useModalStore();
    const router = useRouter();
    const handleClick = ()=>{
        openModal("회원가입이 완료되었습니다.",()=>{
            router.push("/signup");
        })
    }

    const verify = ()=>{
                            if(sameCheck(true)){
                                setSameCheck(true);
                                setFailedString("인증에 성공하였습니다.")
                            }else{
                                setSameCheck(false);
                                if(loginTypeIsEmail){
                                    setFailedString("중복된 이메일입니다.");
                                }else{
                                    setFailedString("전화번호 인증에 실패하였습니다.")
                                }
                            }
                        };

    return (
        <>
            <div className="flex flex-col gap-[10px] mt-[50px]">
                <h1 className="text-[24px] mt-[50px] font-[extrabold]">인증 방법을 선택해 주세요.</h1>

                <div className="flex flex-row items-center w-[420px] h-[44px]">
                    <label className="flex items-center gap-2 cursor-pointer" >
                        <CheckBoxRound checked={loginTypeIsEmail} onChange={()=>{emailCheck(true);phoneNumberCheck(false)}} size="lg"/>
                        <span className="font-semibold text-gray-800 bg-orange-400 ml-[10px] " >이메일</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer ml-[10px]" >
                        <CheckBoxRound checked={loginTypeIsPhoneNumber} onChange={()=>{phoneNumberCheck(true);emailCheck(false)}} size="lg"/>
                        <span className="font-semibold text-gray-800 bg-orange-400 ml-[10px] " >전화번호</span>
                    </label>

                </div>

                { loginTypeIsEmail && <>
                    <input
                        className="bg-[#fff] w-[420px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-between w-[420px] h-[44px]">
                        <span className={"font-[semibold] " + (isSameChecked ? "text-[#47E10C]" : "text-[red]")}>{failedString}</span>
                        <button type="button" className="bg-[#FF9466] text-[white] w-[100px] rounded-[3px] h-[44px]" onClick={verify}>
                            중복확인    
                        </button>
                    </div>
                </>
                }

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

                {
                    password === checkPassword
                    ? <span className={"font-[semibold] text-[#47E10C]"}>비밀번호가 일치합니다.</span>
                    : <span className={"font-[semibold] text-[red]"}>비밀번호가 일치하지 않습니다.</span>
                }
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