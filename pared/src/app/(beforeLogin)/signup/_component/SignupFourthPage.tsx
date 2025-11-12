'use client'

import { useEffect,useState } from "react";
import WhiteCenterPage from "./WhiteCenterPage";
import { updateUserInfo } from "../../login/_component/useSignUpStore";
interface RegionData{
    [sido:string]:{
        [sigungu:string]:string[]
    }
}

export default function FourthPage(){
    const [regionData, setRegionData] = useState<RegionData>({})
  const [sido, setSido] = useState('')
  const [sigungu, setSigungu] = useState('')
  const [dong, setDong] = useState('')

    // ✅ JSON 불러오기
  useEffect(() => {
    fetch('/jsons/region_hierarchy.json')
      .then((res) => res.json())
      .then((data) => setRegionData(data))
      .catch((err) => console.error('지역 데이터 로드 실패:', err))
  }, [])  

  // ✅ 선택지 계산
  const sigunguList = sido ? Object.keys(regionData[sido] || {}) : []
  const dongList = sido && sigungu ? regionData[sido][sigungu] || [] : []

  // ✅ 선택값이 바뀔 때마다 하위 항목 초기화
  const handleSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSido(e.target.value)
    setSigungu('')
    setDong('')
  }

  const handleSigunguChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSigungu(e.target.value)
    setDong('')
  }

    const {setUserInfoStep,setInfomation,infomation} = updateUserInfo();
    return(
        <WhiteCenterPage>
            <div className="flex flex-row items-center w-[420px] h-[44px] mt-[15px]">
                <label id="sido" className="flex items-center gap-2 w-[100px]">시 / 도</label>
                <select
                    name="sido"
                    value={sido}
                    onChange={handleSidoChange}
                    className="bg-[#fff] w-[300px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                >
                <option value="">시/도를 선택하세요</option>
                {Object.keys(regionData).map((name) => (
                    <option key={name} value={name}>
                {name}
            </option>
            ))}
            </select>
            </div>
            <div className="flex flex-row items-center w-[420px] h-[44px] mt-[15px]">
                <label id="sigungu" className="flex items-center gap-2 w-[100px]">시 / 군 / 구</label>
                <select
                    name="sigungu"
                    value={sigungu}
                    onChange={handleSigunguChange}
                    className="bg-[#fff] w-[300px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                >
                <option value="">시/군/구를 선택하세요</option>
          {sigunguList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
            ))}
            </select>
            </div>
            <div className="flex flex-row items-center w-[420px] h-[44px] mt-[15px]">
                <label id="eupMyunDong" className="flex items-center gap-2 w-[100px]">읍 / 면 / 동</label>
                <select
                    name="eupMyunDong"
                    value={dong}
                    onChange={(e)=>setDong(e.target.value)}
                    className="bg-[#fff] w-[300px] h-[44px] border border-[#D9D9D9] rounded-[4px] pl-[25px] focus:outline-none font-medium text-[15px]"
                >
                <option value="">읍/면/동을 선택하세요</option>
          {dongList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
            ))}
            </select>
            </div>
            
            <div className="flex flex-row mt-[100px] items-center justify-between w-[420px] h-[44px]">
                                            <button type="button" className="bg-[#FFF] text-[#FF9466] w-[150px] rounded-[3px] h-[44px] border-[#FF9466] border-[1px]" onClick={()=>{setUserInfoStep(2);}}>
                                                이전으로
                                            </button>
                                            <button type="button" className="bg-[#FF9466] text-[white] w-[150px] rounded-[3px] h-[44px]" onClick={()=>{setUserInfoStep(4)}}>
                                                다음
                                            </button>
                                        </div>
        </WhiteCenterPage>
    )
}