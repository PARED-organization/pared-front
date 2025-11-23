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
import DOMPurify from 'dompurify'
//import CommentList from "./CommentList";
import InnerContent from "./InnerContent";

   const CommentList = React.memo(function CommentList({ innerComments=[] }) {
  return (
    innerComments.map((data, index) => (
      <PostComment key={data.id ?? index} idx={index} comment={data} />
    ))
  );
});

const StaticContent = React.memo(({htmlContent})=>{
    return(
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
  })

export default function PostDetail({initialData,postId}) {


  
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
  


  


  return (
    <div className="overflow-y-auto">
      <Header />
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
              <MoreMenu
  onEdit={() => router.push(`/update/${postId}`)}
  onDelete={() => console.log("글 삭제")}
  onReport={() => console.log("글 신고")}
  onCopyLink={() => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  }}
/>
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
          
        <CommentList innerComments={comments}/>
        </div>
        
        

        {/* 댓글 리스트가 보일 때 */}
        
      </div>
    </div>
  );
}


