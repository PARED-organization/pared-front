// store/useCheckBox.ts

'use client'

import { create } from "zustand";
import CheckBoxRound from "./CheckBoxRound";
import {useCheckBox,policyBox} from "./useSignUpStore"


const Tag = ({ children, type = "required" }) => (
    <span
        className={
        "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs " +
        (type === "required"
         ? "bg-[#FFE6E2] text-[#FF6B4A]"
         : "bg-[#EAF6FF] text-[#2A7EC1]")
        }
    >
        {type === "required" ? "필수" : "선택"}
    </span>
);
const Row = ({children,style="none"}) => (
    <div className={
        "flex m-[10px] p-[10px] items-start py-3 w-[390px] underline " + 
        (style != "none"
            ? style
            : ""
        )
    
    }>
        {children}
    </div>
);

export default function PolicyForm(){
    const {allChecked,items,toggleItem,toggleAll} = useCheckBox();
    const {policyItems,togglePolicyItem} = policyBox();
    return (
        <>
            <h1 className="text-[24px] mt-[50px] font-[extrabold]">서비스 이용약관을 확인해 주세요.</h1>

            <div className="mt-[30px] ">
                <Row style="border-b-[2px] border-[#B3B3B3]">
                    <div className="flex items-start gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <CheckBoxRound checked={allChecked} onChange={toggleAll} size="lg"/>
                        </label>
                        <span className="font-semibold text-gray-800 bg-orange-400 ml-[10px] font-[bold]">모두 동의합니다.</span>
                    </div>
                </Row>

                {
                    policyItems.map((data,index)=>(
                        <div key={index}>
                            <Row>
                            <div className="flex items-start gap-3">
                                <label className="flex items-center gap-2 cursor-pointer" >
                                    <CheckBoxRound checked={items[index]} onChange={()=>toggleItem(index)} size="lg"/>
                                </label>
                                <span className="font-semibold text-gray-800 bg-orange-400 ml-[10px] cursor-pointer" onClick={()=>togglePolicyItem(index)}>{data.title}</span>
                            </div>
                        </Row>
                            {
                                data.toggled
                                ? <div className="w-full max-w-[460px] overflow-y-auto h-[250px] border border-[#FF9466] border-[4px] rounded-[24px] p-[24px]">
                                    {
                                        data.moreInfo.split('\n')
                                        .map((line,i)=>(
                                            <div key={i}>
                                                {line}
                                                <br/>
                                            </div>
                                        ))
                                        
                                    }
                                </div>
                                : <div/>
                            }
                        </div>
                        
                    ))
                    
                } 

                <div className="mt-[50px] flex flex-col items-center px-4 mx-auto justify-center text-[12px] w-[440px] bg-[#FF9466] border-[1px] rounded-[3px] border-[#F3F3F3] text-[white] h-[30px] ">
                    다음
                </div>
            </div>

            


        </>
        

        
    );
}