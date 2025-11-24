'use client'

import { useEffect,useState } from "react";
import { useUpdatePostInfo } from "./UpdateInfo";
import ParedModal from "@/app/(beforeLogin)/login/_component/ParedModal";
import Header from "@/app/(afterLogin)/home/components/Header";
import VisibilityRadio from "@/app/(afterLogin)/write/components/VisibilityRadio";
import TipTapEditor from "@/app/(afterLogin)/write/components/TipTapEditor";
import { useWriteInfo } from "@/app/(afterLogin)/write/components/WriteData";
import { useRouter } from "next/navigation";
import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import { useModalStore } from "@/app/(beforeLogin)/login/_component/useModalStore";
export default function UpdateDetail({initialData}){

    const {title,tagNameList,isPublicOpen,articleTopic,setBeforeData,setTitle} = useUpdatePostInfo();
    const {content,setContent} = useWriteInfo();
    const [visibility, setVisibility] = useState("members");
    const [tempArticleTopic,setTempArticleTopic] = useState("자유게시판");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };


  useEffect(()=>{
        setBeforeData(initialData.title,initialData.content,initialData.articleTopic,initialData.isPublicOpen,initialData.tagNameList)
        setContent(initialData.content)
        
        setTags(initialData.tagNameList ?? [])
        if(isPublicOpen){
        setVisibility("public")
    }else{
        setVisibility("member")
    }

    if(articleTopic==='COMMUNITY'){
        setTempArticleTopic("자유게시판")
    }else if(articleTopic==='QNA'){
        setTempArticleTopic('qna')
    }else if(articleTopic==='INFORMATION'){
        setTempArticleTopic('information')
    }
    },[]);

  const router = useRouter();
  const {openModal} = useModalStore();
  const submit = async () => {
    let isPublicOpen;
    if(visibility === 'members'){
        isPublicOpen = false;
    }else{
      isPublicOpen=true;
    }
    let articleTopicVar;
    if(tempArticleTopic==="자유게시판"){
      articleTopicVar='COMMUNITY'
    }else if(tempArticleTopic==='qna'){
      articleTopicVar='QNA'
    }else if(tempArticleTopic==='information'){
      articleTopicVar='INFORMATION'
    }

    try{
const res = await api.post("/api/v1/article/update-article",{
      articleId:initialData.id,
      title:title,
      content:content,
      articleTopic:articleTopicVar,
      isPublicOpen:isPublicOpen,
      tagNameList: tags
    })
    console.log(res.data);
    if(res.data.status === "SUCCESS"){
      console.log(res.data.status);
      openModal("작성에 성공했습니다.",{
        onConfirm:()=>{
        router.push('/home')
      },
      showCancelButton:false
      })
    }else{
      console.log(res.data.message);
      openModal("에러가 발생하였습니다." + res.data.message)
    }
    } catch(error:any){
      if(error.response){
                const message = error.response.data?.message || "알 수 없는 오류가 발생했습니다."
                openModal("요청이 실패했습니다: "+message);
            }else{
                openModal("서버 연결에 실패했습니다.")
            }
    }
    
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
    

    
    

    return(
        <div>
            <ParedModal/>
            <Header/>
            <div style={{padding: "0 330px"}}>
                <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
            marginBottom: 34,
          }}
        >
                    <VisibilityRadio
                visibility={visibility}
                setVisibility={setVisibility}/>
            <div className="ml[25px]">
                <label>게시판 주제</label>
                <select
                    value={tempArticleTopic}
                    onChange={(e)=>setTempArticleTopic(e.target.value)}
                    className="bg-[#fff] w-[150px] h-[30px] ml-[10px] border border-[#D9D9D9]  rounded-[4px] focus:outline-none font-medium text-[15px]"
                    >
                    <option value="자유게시판">자유게시판</option>
                    <option value="qna">QnA</option>
                    <option value="information">Information</option>
                </select>
            </div>
        </div>
            <div>
                <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="공지사항 제목을 입력하세요"
            className="w-full h-[32px] border border-[#FF9466] mb-[20px] px-[12px] py-[6px] text-[16px] rounded-[4px]"
          />
            </div>
            {<TipTapEditor/>}
            
            <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Container for the tag input and tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {/* Tag Input Field */}
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
              style={{
                width: "179px",
                height: "44px",
                border: "1px solid #FF9466",
                padding: "6px 12px",
                fontSize: "16px",
                borderRadius: "4px",
              }}
            />

            {/* Display Tags */}
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#FF9466",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                onClick={() => removeTag(tag)}
              >
                #{tag}
                <span style={{ fontWeight: "bold" }}>x</span>
              </div>
            ))}
          </div>

          <div className="flex gap-[25px]">
            <div className="w-[110px] h-[42px] flex items-center justify-center border border-[#FF9466] rounded-[4px] bg-white text-[#FF9466] hover:bg-[#FF9466] hover:text-[#ffffff] cursor-pointer">
              임시저장
            </div>
            <div className="w-[110px] h-[42px] flex items-center justify-center border border-[#FF9466] rounded-[4px] bg-white text-[#FF9466] hover:bg-[#FF9466] hover:text-[#ffffff] cursor-pointer" onClick={submit}>
              작성하기
            </div>
          </div>
        </div>
            </div>

        </div>
    );
}