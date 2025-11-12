import { p } from "framer-motion/client";
import {create} from "zustand"


const initialPolicyItems = [
        {
            title: "서비스 이용약관 동의 (필수)",
            moreInfo: `제1조 (목적)
본 약관은 PARED 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n

제2조 (정의)\n

“이용자”라 함은 본 약관에 따라 서비스를 이용하는 회원을 말합니다.\n

“회원”이라 함은 회사와 서비스 이용계약을 체결하고 계정을 부여받은 자를 의미합니다.\n

제3조 (약관의 효력 및 변경)\n

본 약관은 서비스를 이용하는 모든 이용자에게 그 효력이 발생합니다.\n

회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.\n

제4조 (서비스의 제공 및 변경)\n
회사는 이용자에게 다음과 같은 서비스를 제공합니다.\n

콘텐츠 열람, 게시, 공유 기능\n

커뮤니티 및 전문가 Q&A 기능\n

기타 회사가 정하는 부가 서비스\n

제5조 (이용자의 의무)\n
이용자는 서비스 이용 시 다음 각 호의 행위를 해서는 안 됩니다.\n
타인의 정보를 도용하거나 허위 정보 입력\n
서비스 운영을 방해하는 행위\n
공공질서 및 미풍양속에 반하는 행위\n`,
            toggled:false,
            isNecessary:true,
            checked:false
        },
    {
        title:"개인정보 처리방침 동의 (필수)",
        moreInfo:`1. 수집하는 개인정보 항목\n
회사는 회원가입, 상담, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집합니다.\n

필수 항목: 이름, 이메일 주소, 비밀번호, 생년월일\n

선택 항목: 프로필 이미지, 관심 분야\n

2. 개인정보의 수집 및 이용 목적\n

회원 관리 및 본인 확인\n

서비스 제공 및 콘텐츠 추천\n

이용자 문의 대응 및 불만 처리\n

3. 개인정보의 보유 및 이용 기간\n
회사는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.\n
단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 그 기간 동안 보관합니다.\n

4. 동의 거부권 및 불이익 안내\n
이용자는 개인정보 수집 및 이용에 동의하지 않을 권리가 있으나, 필수 항목에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.\n`,
            toggled:false,
            isNecessary:true,
            checked:false
    },
    {
        title:"마케팅 정보 수신 동의 (선택)",
        moreInfo:`
        회사는 이용자에게 보다 유용한 맞춤형 정보를 제공하기 위하여 이메일, SMS, 앱 푸시 등을 통해 다음과 같은 정보를 발송할 수 있습니다.\n

신규 서비스 및 이벤트 소식\n

할인 및 프로모션 안내\n

설문조사 및 만족도 조사 요청\n

이용자는 언제든지 마케팅 정보 수신을 거부할 수 있으며, 거부 시 서비스 이용에 불이익은 없습니다.\n`,
            toggled:false,
            isNecessary:false,
            checked:false
    },
    {
        title:"위치정보 이용약관 동의 (선택)",
        moreInfo:`제1조 (목적)
본 약관은 회사가 제공하는 위치기반서비스의 이용과 관련하여 회사와 이용자의 권리, 의무를 규정함을 목적으로 합니다.\n

제2조 (위치정보의 수집 및 이용)\n
회사는 이용자의 동의 하에 GPS, Wi-Fi, 기지국 정보 등을 활용하여 이용자의 위치정보를 수집하고, 다음의 목적을 위해 이용합니다.\n

주변 콘텐츠 추천\n

맞춤형 서비스 제공\n

통계 분석 및 서비스 개선\n

제3조 (위치정보의 보유기간 및 이용기간)\n
회사는 이용 목적이 달성된 후 즉시 위치정보를 파기합니다.\n
단, 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보유할 수 있습니다.\n

제4조 (동의 철회)\n
이용자는 언제든지 위치정보 이용에 대한 동의를 철회할 수 있으며, 철회 즉시 관련 정보의 수집 및 이용은 중단됩니다.\n` ,
            toggled:false,
            isNecessary:false,
            checked:false
    }
    ,
    {
        title:"만 14세 이상입니다 (필수)",
        moreInfo:"",
        toggled:false,
        isNecessary:true,
            checked:false
    }
    
  ] satisfies PolicyBoxInfo[];

interface SignUpBasisState{
  loginTypeIsEmail:boolean;
  loginTypeIsPhoneNumber:boolean;
  phoneNumber:string;
  email:string;
  isSameChecked:boolean;
  failedString: string;
  password:string;
  checkPassword:string;

  sameCheck:(isSame:boolean)=>boolean;
  setSameCheck:(isSameChecked:boolean)=>void;
  emailCheck:(loginTypeIsEmail:boolean)=>void;
  phoneNumberCheck:(loginTypeIsPhoneNumber:boolean)=>void
  isLegalPassword:()=>boolean;
  setFailedString:(failedString:string)=>void;
  setEmail: (email: string) => void;
  setPassword:(password:string)=>void;
  setCheckPassword:(checkPassword:string)=>void;
}

export const updateSignUpBasis = create<SignUpBasisState>((set,get)=>({
    loginTypeIsEmail:true,
    loginTypeIsPhoneNumber:false,
    phoneNumber:'',
    email:'',
    isSameChecked:false,
    failedString:'',
    password:'',
    checkPassword:'',
    sameCheck : (isSame:boolean)=>{ return isSame},
    isLegalPassword:()=>{return false},
    emailCheck: (loginTypeIsEmail)=>set({loginTypeIsEmail}),
    phoneNumberCheck:(loginTypeIsPhoneNumber) => set({loginTypeIsPhoneNumber}),
    setSameCheck:(isSameChecked:boolean)=>set({isSameChecked}),
    setFailedString:(failedString:string)=>set({failedString}),
    setEmail:(email)=>set({email}),
    setPassword:(password)=>set({password}),
    setCheckPassword:(checkPassword)=>set({checkPassword}),
    
}))

interface CheckBoxState {
  allChecked: boolean;
  items: PolicyBoxInfo[];
  toggleItem: (index: number) => void;
  toggleAll: () => void;
  togglePolicyItem:(index:number)=>void;
  allNecessaryAgreed: ()=>boolean;
}

interface KoreaGeo{
  sido:string,
  siGunGu:string,
  eupMyunDong:string
}

interface UserInfo{
  userRole: 'parent' | 'languageTherapihst';
  profilePic: string;
  nickName: string;
  introduce?: string;
  geo:KoreaGeo;
  isInvited: boolean
  userInfoStep:number;
  infomation:string;
  setRole:(role: 'parent' | 'languageTherapihst')=>void;
  setUserInfoStep:(userInfoStep:number)=>void;
  setProfilePic:(profilePic:string)=>void;
  setNickName:(nickName:string)=>void;
  setInfomation:(infomation:string)=>void;
  setGeo:(geo:KoreaGeo)=>void;
}

export const updateUserInfo = create<UserInfo>((set,get)=>({
  userInfoStep:0,
  profilePic:"/images/common/default_profile.png",
  userRole:'parent',
  nickName:'',
  geo:{sido:'',siGunGu:'',eupMyunDong:''},
  isInvited:false,
  infomation:'',
  setRole: (userRole: 'parent' | 'languageTherapihst')=>set({userRole}),
  setUserInfoStep:(userInfoStep:number) => set({userInfoStep}),
  setProfilePic:(profilePic:string)=>set({profilePic}),
  setNickName:(nickName)=>set({nickName}),
  setInfomation:(infomation:string)=>set({infomation}),
  setGeo:(geo:KoreaGeo) => set({geo})
}))

interface PolicyBoxInfo{
    title:string;
    moreInfo:string;
    toggled:boolean;
    isNecessary:boolean;
    checked:boolean;
}


interface SignUpState{
    step: number;
    isGeneral: boolean;
    setStep: (step:number) => void;
    setGeneral:(general:boolean) => void;
}

export const signUpInfo = create<SignUpState>((set)=>({
    step: 1,
    isGeneral: true,
    setStep: (step) => set({step}),
    setGeneral: (isGeneral) => set({isGeneral}),
}))

export const useCheckBox = create<CheckBoxState>((set,get) => ({
  allChecked: false,
  items: initialPolicyItems,

  toggleItem: (index) =>
    set((state) => {
      const newItems = [...state.items];
      newItems[index].checked = !newItems[index].checked;
      const allChecked = newItems.every((v) => v);
      return { items: newItems, allChecked };
    }),

  toggleAll: () =>
    set((state) => {
      const newValue = !state.allChecked;
      const newItems = [...state.items];
      state.items.map((it)=>it.checked = newValue);
      return {
        allChecked: newValue,
        items: newItems
      };
    }),
    togglePolicyItem: (index) =>
    set((state) => {
      const newItems = [...state.items];
      newItems[index].toggled = !newItems[index].toggled;
      return {items:newItems};
    }),

    allNecessaryAgreed: ()=>{
        const {items} = get();
        return items
            .filter((item)=>item.isNecessary)
            .every((item)=>item.checked)
            
    },
}));
