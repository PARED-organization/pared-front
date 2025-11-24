"use client";

import React, { useEffect, useState ,useRef, useLayoutEffect} from "react";
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

//import CommentList from "./CommentList";

   const CommentList = React.memo(function CommentList({ innerComments=[] ,articleId,currentUser}) {
  return (
    innerComments.map((data, index) => (
      <PostComment key={data.id ?? index} idx={index} comment={data} articleId={articleId} currentUser={currentUser}/>
    ))
  );
});

const StaticContent = React.memo(({htmlContent})=>{
    return(
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
  })

export default function PostDetail({initialData,postId,currentUser}) {

    const {openModal,closeModal} = useModalStore();
    
    const {openReportModal} = useReportModalStore();
  const {writeComment,setWriteComment,initShowReplies,showReplies,setLikeCnt,likeCnt,comments,recomments,setCommentsAndRecomments} = usePostRecommentInfo();
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
  setCommentsAndRecomments(initialData.commentDTOList);
  
}, []);

  const commentSubmit = async ()=>{
    const res = await api.post("/api/v1/comment/write-comment",{
            articleId:initialData.id,
            parentCommentId:null,
            content:writeComment
    })
    if(res.data.status==="SUCCESS"){
        initShowReplies(res.data.data.commentDTOList.length);
        setCommentsAndRecomments(res.data.data.commentDTOList);
        setWriteComment("")
    }
  }
  
  const deleteSubmit = async()=>{
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
                    likeClick()
                }else{
                    unLikeClick()
                }
              }}
              />
              {
                initialData.paredUser.id === currentUser.id
                ? 
                <MoreMenu
  onEdit={() => router.push(`/update/${postId}`)}
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
  onReport={() => openReportModal({
    targetId:initialData.id,
    id:initialData.paredUser.id,
    nickname:initialData.paredUser.nickName,
    profilePic:ImageServe(initialData.paredUser.profilePic.link)
  },(content)=>reportSubmit(initialData.id,initialData.paredUser.id,content)
)}
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
          {comments.length} Comments
        </div>
        <div>
            <CommentInput  commentSubmit={commentSubmit}/>
          
        <CommentList innerComments={comments} articleId={initialData.id} currentUser={currentUser}/>
        </div>
        
        

        {/* 댓글 리스트가 보일 때 */}
        
      </div>
    </div>
  );
}


