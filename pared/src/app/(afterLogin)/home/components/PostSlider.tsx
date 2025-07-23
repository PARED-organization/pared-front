"use client";

import { useState } from "react";
import Image from "next/image";

interface Post {
  author: string;
  question: string;
  detail: string;
  comments: number;
  views: number;
  likes: number;
}

interface Props {
  title: string;
  posts: Post[];
}

export default function PostSlider({ title, posts }: Props) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + posts.length) % posts.length);

  const post = posts[current];

  return (
    <div className="flex flex-col">
      <div className="w-[108px] h-[35px] bg-[#FF9466] rounded-full flex items-center justify-center mb-[20px] text-white">
        <span className="text-[18px] font-semibold">{title}</span>
      </div>
      <div className="relative w-[354px] h-[255px] bg-white border border-[#FF9466] rounded-[5px] px-[43px] py-[20px] overflow-hidden">
        <button
          onClick={prev}
          className="absolute left-[9px] top-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/main/arrow.svg"
            alt="Prev"
            width={43}
            height={43}
          />
        </button>
        <button
          onClick={next}
          className="absolute right-[9px] top-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/main/arrow1.svg"
            alt="Next"
            width={43}
            height={43}
          />
        </button>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <Image
              src="/images/main/user.svg"
              alt="User"
              width={75}
              height={75}
            />
            <span className="text-[#5C4033] text-[16px]">{post.author}</span>
          </div>
          <p className="text-[#5C4033] text-[12px] px-[20px] leading-snug">
            Q. {post.question} <br />
            {post.detail}
          </p>
          <div className="absolute bottom-[20px] right-[30px] flex gap-[10px] text-[#11111] text-[12px]">
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
    </div>
  );
}
