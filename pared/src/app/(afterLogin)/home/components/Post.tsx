"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageServe from "../../post/[postId]/components/ImageServe";
import { useRouter } from "next/navigation";

export default function PostGrid({ boards }) {
  const [selectedBoard, setSelectedBoard] =useState("자유게시판");
  
  const [boardData,setBoardData] = useState(boards.communityArticleDTOList);
  const router = useRouter();
  return (
    <div className="flex flex-col">
      {/* 버튼들 */}
      <div className="flex gap-[10px] mb-[20px]">
        {(["자유게시판", "정보게시판", "QnA"]).map(
          (board) => (
            <button
              key={board}
              onClick={() => {
                setSelectedBoard(board)
                if(board === "자유게시판")
                  setBoardData(boards.communityArticleDTOList)
                else if(board ==="정보게시판")
                  setBoardData(boards.informationArticleDTOList)
                else if(board === "QnA")
                  setBoardData(boards.qnaArticleDTOList)
              }}
              className={`w-[120px] h-[40px] rounded-full font-semibold ${
                selectedBoard === board
                  ? "bg-[#FF9466] text-[#ffffff]"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {board === "QnA" ? "Q&A" : board}
            </button>
          )
        )}
      </div>

      
      <div className="grid grid-cols-4 gap-[20px]">
        {boardData.map((post, idx) => (
          <div
            key={idx}
            className="relative w-[358px] h-[255px] bg-white border border-[#FF9466] rounded-[5px] px-[43px] py-[20px] overflow-hidden"
          >
            <div className="flex flex-col gap-[10px] cursor-pointer" onClick={()=>router.push(`/post/${post.id}`)}>
              <div className="flex items-center gap-[10px]">
                <div className="w-[75px] h-[75px] border-[#FF9466] border-[2px] rounded-full overflow-hidden">
                  <Image
                  src={ImageServe(post.paredUser.profilePic.link)}
                  alt="User"
                  width={75}
                  height={75}
                  className="object-fill w-[75px] h-[75px]"
                />
                </div>
                
                <span className="text-[#5C4033] text-[16px]">
                  {post.paredUser.nickName}
                </span>
              </div>
              <p className="text-[#5C4033] text-[20px] px-[20px] leading-snug">
                {post.title}
              </p>
              
              <div className="absolute bottom-[20px] right-[30px] flex gap-[10px] text-[#111111] text-[12px]">
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/comment.svg"
                    alt="댓글"
                    width={20}
                    height={20}
                  />
                  {post.commentCnt}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/views.svg"
                    alt="조회수"
                    width={20}
                    height={20}
                  />
                  {post.viewCnt}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/like.svg"
                    alt="좋아요"
                    width={20}
                    height={20}
                  />
                  {post.likeCnt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
