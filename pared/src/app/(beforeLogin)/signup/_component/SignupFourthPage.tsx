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
            <div>
                <div className="flex flex-col gap-4 p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow">
      {/* 시/도 */}
      <div>
        <label className="block text-sm font-semibold mb-1">시 / 도</label>
        <select
          value={sido}
          onChange={handleSidoChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">시/도를 선택하세요</option>
          {Object.keys(regionData).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* 시/군/구 */}
      <div>
        <label className="block text-sm font-semibold mb-1">시 / 군 / 구</label>
        <select
          value={sigungu}
          onChange={handleSigunguChange}
          disabled={!sido}
          className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
        >
          <option value="">시/군/구를 선택하세요</option>
          {sigunguList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* 읍/면/동 */}
      <div>
        <label className="block text-sm font-semibold mb-1">읍 / 면 / 동</label>
        <select
          value={dong}
          onChange={(e) => setDong(e.target.value)}
          disabled={!sigungu}
          className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
        >
          <option value="">읍/면/동을 선택하세요</option>
          {dongList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* 현재 선택된 지역 표시 */}
      <div className="mt-4 text-sm text-gray-700">
        {sido && (
          <>
            선택된 지역: <span className="font-semibold">{sido}</span>
            {sigungu && ` > ${sigungu}`}
            {dong && ` > ${dong}`}
          </>
        )}
      </div>
    </div>
            </div>
        </WhiteCenterPage>
    )
}