'use client'
import WaitingScreen from "../login/_component/WaitingScreen"
import Image from "next/image"
import {useState,useEffect} from "react";
import { updateUserInfo } from "../login/_component/useSignUpStore";
import ProgressBar from "@ramonak/react-progress-bar";
import FirstPage from "./_component/SignUpFirstPage";
import SecondPage from "./_component/SignUpSecondPage";
import ThirdPage from "./_component/SignUpThirdPage";
import FourthPage from "./_component/SignupFourthPage";
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
                        <div className="absolute top-[30px] left-[30px] z-[100]">
                            <Image
                                                    src="/images/common/new_logo.png"
                                                    alt="logo"
                                                    width={150}
                                                    height={71}
                                                    priority
                                                />
                        </div>
                        {
                            userInfoStep === 0 
                            &&
                            <FirstPage/>
                        }
                        {
                            userInfoStep === 1 &&
                            <SecondPage/>
                        }
                        {
                            userInfoStep === 2 &&
                            <ThirdPage/>
                        }
                        {
                            userInfoStep === 3 &&
                            <FourthPage/>
                        }
                    </div>
                }
            </div>
        </>
    )
}