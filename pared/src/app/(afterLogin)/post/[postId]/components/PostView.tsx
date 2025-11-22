"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/(afterLogin)/home/components/Header";
import Image from "next/image";
import PostComment from "./PostComment";
import { usePostRecommentInfo } from "./PostRecommentInfo"; 
import LikeButton from "./LikeButton";
import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
export default function PostDetail({initialData}) {


  
  const {initShowReplies,showReplies,setLikeCnt,likeCnt,comments,recomments,setCommentsAndRecomments} = usePostRecommentInfo();
  const likeClick = async ()=>{
    const res = await api.post("/api/v1/article/increase-like",{
        articleId:initialData.id
    });
    if(res.data.status==="SUCCESS"){
        setLikeCnt(res.data.data.currentArticleLikeCnt);
    }
  }

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
  return (
    <div>
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
              
            </div>
            <div className="flex text-[16px] text-[#6A7380] gap-[20px] mb-[63px]">
              <div>작성시간 : {initialData.baseTime.createdDate}</div>
              <div>작성자 : {initialData.paredUser.nickName}</div>
              <div>조회수 : {initialData.viewCnt}</div>
              <div>좋아요 : {likeCnt}</div>
            </div>
            <div className="mb-[11px]" dangerouslySetInnerHTML={{__html:initialData.content}}>
              
            </div>
            <div className="flex justify-center items-center mb-[36px]">
              <Image
                src="/images/main/postdetail.svg"
                alt="post detail image"
                width={245}
                height={184}
              />
            </div>
          </div>
        </div>
        <div className="px-[51px] text-[18px] font-bold mb-[18px] mt-[31px] gap-[15px] flex items-center">
          <Image
            src="/images/main/postnumber.svg"
            alt="post detail image"
            width={24}
            height={24}
          />
          숫자 Comments
        </div>
        <div className="inline-flex items-center border border-[#FF9466] rounded-[20px] h-[96px] px-[12px] py-[19px] w-full max-w-md">
          <input
            type="text"
            className="flex-grow h-full rounded-l-[20px] border-none outline-none"
            placeholder="댓글을 입력해주세요(최대 N000자)."
          />
          <Image
            src="/images/main/postcomment.svg"
            alt="post detail image"
            width={39}
            height={48}
          />
        </div>
        {
            comments.map((data,index)=>(
            <PostComment key={index} idx={index} comment={data}/>
        ))
        }
        

        {/* 댓글 리스트가 보일 때 */}
        
      </div>
    </div>
  );
}


