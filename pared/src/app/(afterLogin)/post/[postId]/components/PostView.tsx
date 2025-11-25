"use client";

import React, { useEffect, useState ,useRef, useLayoutEffect, useCallback} from "react";
import Header from "@/app/(afterLogin)/home/components/Header";
import Image from "next/image";
import PostComment from "./PostComment";
import { usePostRecommentInfo } from "./PostRecommentInfo"; 
import LikeButton from "./LikeButton";
import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import MoreMenu from "./MoreMenu";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import CommentInput from "./CommentsInput";
import { useModalStore } from "@/app/(beforeLogin)/login/_component/useModalStore";
import ParedModal from "@/app/(beforeLogin)/login/_component/ParedModal";
import ParedReportModal from "./ParedReportModal";
import { useReportModalStore } from "./ReportModalState";
import ImageServe from "./ImageServe";
import GetLoginedUserInfo from "./GetLoginedUserInfo";
import {v4 as uuidv4} from "uuid"

//import CommentList from "./CommentList";


const CommentList = ({  innerComments=[] ,articleId,currentUser }) => {
  return (
    innerComments.map((data, index) => (
      <PostComment idx={index} comment={data} articleId={articleId} currentUser={currentUser}/>
    ))
  );
}

const StaticContent = React.memo(({htmlContent})=>{
    return(
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
  })

export default function PostDetail({initialData,postId,currentUser}) {

    const {openModal,closeModal} = useModalStore();
    
    const {openReportModal} = useReportModalStore();
    const isLogined = currentUser ? true : false;
    const unLoginedAction = ()=>{
      if(!isLogined){
          openModal("로그인 후 이용할 수 있습니다.")
      return false;
      }else{
        return true;
      }
    }
    const [page,setPage] = useState(0);
    const [isLoading,setisLoading] = useState(false);

    
    const isLoadingRef = useRef(false);
    const pageRef = useRef(0);
    const isFinalRef = useRef(false);
    
  const handleObserver = (entries)=>{
    const intersect = entries[0];
    
    if(intersect.isIntersecting&&!isFinalRef.current){
      pageRef.current+=1;
      console.log(pageRef.current);
      setPage(pageRef.current);
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  useEffect(()=>{
    scrollData();
  },[page])

  const scrollData = async ()=>{
    setisLoading(true);
    isLoadingRef.current = true;
    try{
      const res = await api.get(`/api/v1/comment/get-more-content/${initialData.id}`,{
        params:{
          cursor:page
        }
      });

      const newData = res.data.data.commentDTOList;

      if(newData.length>0){
        setComments([...comments,...newData]);
      }else{
        
        isFinalRef.current = true;
      }
    }catch(e){
      console.error(e);
    }
    setisLoading(false)
    isLoadingRef.current =false;
  }

  const {writeComment,setWriteComment,initShowReplies,showReplies,setLikeCnt,likeCnt,comments,recomments,setComments} = usePostRecommentInfo();
  
  const likeClick = async ()=>{
    


    const res = await api.post("/api/v1/article/increase-like",{
        articleId:initialData.id
    });
    if(res.data.status==="SUCCESS"){
        setLikeCnt(res.data.data.currentArticleLikeCnt);
    }
  }
    


  const nonChangedContent = initialData.content;
  
  const router = useRouter();
  const unLikeClick = async ()=>{
    
    const res = await api.post("/api/v1/article/decrease-like",{
        articleId:initialData.id
    });
    if(res.data.status==="SUCCESS"){
        setLikeCnt(res.data.data.currentArticleLikeCnt);
    }
  }

  useEffect(() => {
    
  initShowReplies(initialData.commentDTOList.length);
  setLikeCnt(initialData.likeCnt);
  setComments(initialData.commentDTOList);
  
}, []);




  const commentSubmit = async ()=>{
    if(!unLoginedAction())
      return;
    const res = await api.post("/api/v1/comment/write-comment",{
            articleId:initialData.id,
            parentCommentId:null,
            content:writeComment
    })
    if(res.data.status==="SUCCESS"){
        initShowReplies(res.data.data.commentDTOList.length);
        setComments(res.data.data.commentDTOList);
        setWriteComment("")
    }
  }
  
  const deleteSubmit = async()=>{
    if(!unLoginedAction())
      return;
        const res = await api.delete(`/api/v1/article/delete-article/${initialData.id}`);
        if(res.data.status==="SUCCESS"){
            openModal("삭제에 성공하였습니다.",{
                onConfirm:()=>router.push("/home"),
                showCancelButton:false
            })
        }else{
            openModal("권한이 없습니다.")
        }
  }
  const reportSubmit = async(articleId,targetUserId,content)=>{
    if(!unLoginedAction())
      return;
    const res = await api.post(`/api/v1/article/report-article`,{
        articleId:articleId,
        targetUserId:targetUserId,
        content:content
    })

    if(res.data.status==="SUCCESS"){
        openModal("신고에 성공하였습니다.");
    }else{
        openModal("권한이 없습니다.");
    }
  }

  


  
  return (
    <div >
        
      <Header />
      <ParedModal/>
        <ParedReportModal/>
      <div className="w-full max-w-[1920px] px-[303px] ">
        <div className="text-[32px] font-extrabold mb-[19px]">정보게시판</div>
        <div
          className="border-y border-x-0 border-solid py-[19px]"
          style={{ borderColor: "#FF9466", borderWidth: "2px 0" }}
        >
          <div>
            <div className="flex justify-between items-center ">
              <div className="text-[20px] font-semibold mb-[12px]">
                {initialData.title}
              </div>
              <div className="flex flex-row">
                <LikeButton
              
              initialLiked={initialData.currentUserIsLiked}
              onToggle={(state)=>{
                if(state){
                  if(!unLoginedAction()){
                        return false;
                  }
                    else{
                      likeClick()
                      return true;
                    }
                    
                }else{
                  if(!unLoginedAction())
                      return false;
                    else{
                      unLikeClick()
                      return true;
                    }
                    
                }
              }}
              />
              {
                isLogined && initialData.paredUser.id === currentUser.id
                ? 
                <MoreMenu
  onEdit={() => {
    if(!unLoginedAction())
      return;
    router.push(`/update/${postId}`)
  }}
  onDelete={()=>openModal("삭제하시겠습니까?",{
    onConfirm:()=> deleteSubmit(),
    onCancel:()=> closeModal(),
    showCancelButton: true
  })}
  onCopyLink={() => {
    navigator.clipboard.writeText(window.location.href);
    openModal("링크가 복사되었습니다.")
  }}
/>
:
<MoreMenu
  onReport={() => {
    if(!unLoginedAction())
      return;
    else{
openReportModal({
    targetId:initialData.id,
    id:initialData.paredUser.id,
    nickname:initialData.paredUser.nickName,
    profilePic:ImageServe(initialData.paredUser.profilePic.link)
  },(content)=>reportSubmit(initialData.id,initialData.paredUser.id,content)
)}}
    }
    
  onCopyLink={() => {
    navigator.clipboard.writeText(window.location.href);
    openModal("링크가 복사되었습니다.")
  }}
/>
              }
              
              </div>
              
              
            </div>
            <div className="flex text-[16px] text-[#6A7380] gap-[20px] mb-[63px]">
              <div>작성시간 : {initialData.baseTime.createdDate}</div>
              <div>작성자 : {initialData.paredUser.nickName}</div>
              <div>조회수 : {initialData.viewCnt}</div>
              <div>좋아요 : {likeCnt}</div>
            </div>
            
            <StaticContent htmlContent={nonChangedContent}/>
            
          </div>
        </div>
        <div className="px-[51px] text-[18px] font-bold mb-[18px] mt-[31px] gap-[15px] flex items-center">
          <Image
            src="/images/main/postnumber.svg"
            alt="post detail image"
            width={24}
            height={24}
          />
          {initialData.commentCnt} Comments
        </div>
        <div>
            <CommentInput  commentSubmit={commentSubmit}/>
          
        <CommentList innerComments={comments} articleId={initialData.id} currentUser={currentUser}/>

        
        </div>
        {/* 로딩 트리거 */}
      {isLoading && <p>Loading...</p>}
      <div id="observer" style={{ height: "10px" }}></div>
        
        

        {/* 댓글 리스트가 보일 때 */}
        
      </div>
    </div>
  );
}


