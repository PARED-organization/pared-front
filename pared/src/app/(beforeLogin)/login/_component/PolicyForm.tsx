// store/useCheckBox.ts

'use client'

import { create } from "zustand";
import CheckBoxRound from "./CheckBoxRound";

interface CheckBoxState {
  allChecked: boolean;
  items: boolean[];
  toggleItem: (index: number) => void;
  toggleAll: () => void;
}

interface PolicyBoxInfo{
    title:string;
    moreInfo:string;
    toggled:boolean
}

interface PolicyBoxState{
    policyItems:PolicyBoxInfo[];
    togglePolicyItem:(index:number) => void
}

export const useCheckBox = create<CheckBoxState>((set) => ({
  allChecked: false,
  items: [false, false, false, false, false],

  toggleItem: (index) =>
    set((state) => {
      const newItems = [...state.items];
      newItems[index] = !newItems[index];
      const allChecked = newItems.every((v) => v);
      return { items: newItems, allChecked };
    }),

  toggleAll: () =>
    set((state) => {
      const newValue = !state.allChecked;
      return {
        allChecked: newValue,
        items: state.items.map(() => newValue),
      };
    }),
}));

const initialPolicyItems = [
        {
            title: "서비스 이용약관 동의 (필수)",
            moreInfo: `제1조 (목적)
본 약관은 PARED 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)

“이용자”라 함은 본 약관에 따라 서비스를 이용하는 회원을 말합니다.

“회원”이라 함은 회사와 서비스 이용계약을 체결하고 계정을 부여받은 자를 의미합니다.

제3조 (약관의 효력 및 변경)

본 약관은 서비스를 이용하는 모든 이용자에게 그 효력이 발생합니다.

회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.

제4조 (서비스의 제공 및 변경)
회사는 이용자에게 다음과 같은 서비스를 제공합니다.

콘텐츠 열람, 게시, 공유 기능

커뮤니티 및 전문가 Q&A 기능

기타 회사가 정하는 부가 서비스

제5조 (이용자의 의무)
이용자는 서비스 이용 시 다음 각 호의 행위를 해서는 안 됩니다.
타인의 정보를 도용하거나 허위 정보 입력
서비스 운영을 방해하는 행위
공공질서 및 미풍양속에 반하는 행위`,
            toggled:false,
        },
    {
        title:"개인정보 처리방침 동의 (필수)",
        moreInfo:`1. 수집하는 개인정보 항목
회사는 회원가입, 상담, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집합니다.

필수 항목: 이름, 이메일 주소, 비밀번호, 생년월일

선택 항목: 프로필 이미지, 관심 분야

2. 개인정보의 수집 및 이용 목적

회원 관리 및 본인 확인

서비스 제공 및 콘텐츠 추천

이용자 문의 대응 및 불만 처리

3. 개인정보의 보유 및 이용 기간
회사는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 그 기간 동안 보관합니다.

4. 동의 거부권 및 불이익 안내
이용자는 개인정보 수집 및 이용에 동의하지 않을 권리가 있으나, 필수 항목에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.`,
            toggled:false
    },
    {
        title:"마케팅 정보 수신 동의 (선택)",
        moreInfo:`
        회사는 이용자에게 보다 유용한 맞춤형 정보를 제공하기 위하여 이메일, SMS, 앱 푸시 등을 통해 다음과 같은 정보를 발송할 수 있습니다.

신규 서비스 및 이벤트 소식

할인 및 프로모션 안내

설문조사 및 만족도 조사 요청

이용자는 언제든지 마케팅 정보 수신을 거부할 수 있으며, 거부 시 서비스 이용에 불이익은 없습니다.`,
            toggled:false
    },
    {
        title:"위치정보 이용약관 동의 (선택)",
        moreInfo:`제1조 (목적)
본 약관은 회사가 제공하는 위치기반서비스의 이용과 관련하여 회사와 이용자의 권리, 의무를 규정함을 목적으로 합니다.

제2조 (위치정보의 수집 및 이용)
회사는 이용자의 동의 하에 GPS, Wi-Fi, 기지국 정보 등을 활용하여 이용자의 위치정보를 수집하고, 다음의 목적을 위해 이용합니다.

주변 콘텐츠 추천

맞춤형 서비스 제공

통계 분석 및 서비스 개선

제3조 (위치정보의 보유기간 및 이용기간)
회사는 이용 목적이 달성된 후 즉시 위치정보를 파기합니다.
단, 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보유할 수 있습니다.

제4조 (동의 철회)
이용자는 언제든지 위치정보 이용에 대한 동의를 철회할 수 있으며, 철회 즉시 관련 정보의 수집 및 이용은 중단됩니다.` ,
            toggled:false
    }
    ,
    {
        title:"만 14세 이상입니다 (필수)",
        moreInfo:"",
        toggled:false
    }
    
  ] satisfies PolicyBoxInfo[];

export const policyBox = create<PolicyBoxState>((set)=>({
    policyItems:initialPolicyItems,

   togglePolicyItem: (index) =>
    set((state) => ({
      policyItems: state.policyItems.map((it, i) =>
        i === index ? { ...it, toggled: !it.toggled } : it
      ),
    })),
}))

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
                                    {data.moreInfo}
                                </div>
                                : <div/>
                            }
                        </div>
                        
                    ))
                } 
            </div>

            


        </>
        

        
    );
}