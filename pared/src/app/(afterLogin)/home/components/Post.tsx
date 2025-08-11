"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Post {
  author: string;
  question: string;
  detail: string;
  comments: number;
  views: number;
  likes: number;
}

interface BoardData {
  title: string;
  posts: Post[];
}

interface Props {
  boards: {
    자유게시판: Post[];
    정보게시판: Post[];
    QnA: Post[];
  };
}

export default function PostGrid({ boards }: Props) {
  const [selectedBoard, setSelectedBoard] =
    useState<keyof typeof boards>("자유게시판");

  const boardData: BoardData = {
    title: selectedBoard,
    posts: boards[selectedBoard],
  };

  return (
    <div className="flex flex-col">
      {/* 버튼들 */}
      <div className="flex gap-[10px] mb-[20px]">
        {(["자유게시판", "정보게시판", "QnA"] as (keyof typeof boards)[]).map(
          (board) => (
            <button
              key={board}
              onClick={() => setSelectedBoard(board)}
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

      {/* 6개 카드 그리드 (3x2) */}
      <div className="grid grid-cols-3 gap-[20px]">
        {boardData.posts.slice(0, 6).map((post, idx) => (
          <div
            key={idx}
            className="relative w-[358px] h-[255px] bg-white border border-[#FF9466] rounded-[5px] px-[43px] py-[20px] overflow-hidden"
          >
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/main/user.svg"
                  alt="User"
                  width={75}
                  height={75}
                />
                <span className="text-[#5C4033] text-[16px]">
                  {post.author}
                </span>
              </div>
              <p className="text-[#5C4033] text-[12px] px-[20px] leading-snug">
                Q. {post.question} <br />
                {post.detail}
              </p>
              <div className="absolute bottom-[20px] right-[30px] flex gap-[10px] text-[#111111] text-[12px]">
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/comment.svg"
                    alt="댓글"
                    width={20}
                    height={20}
                  />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/views.svg"
                    alt="조회수"
                    width={20}
                    height={20}
                  />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/images/main/like.svg"
                    alt="좋아요"
                    width={20}
                    height={20}
                  />
                  {post.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
