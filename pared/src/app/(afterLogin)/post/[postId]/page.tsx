"use client";

import React, { useState } from "react";
import Header from "@/app/(afterLogin)/home/components/Header";
import Image from "next/image";

function PostDetail() {
  const [showReplies, setShowReplies] = useState(false);

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
                게시글 제목이 들어갑니다.
              </div>
              <Image
                src="/images/main/postlike.svg"
                alt="post detail image"
                width={100}
                height={40}
              />
            </div>
            <div className="flex text-[16px] text-[#6A7380] gap-[20px] mb-[63px]">
              <div>2024-06-17</div>
              <div>작성자 : 홍길동</div>
              <div>조회수 : 123</div>
              <div>좋아요 : 50</div>
            </div>
            <div className="mb-[11px]">
              텍스트 본문입니다 텍스트 본문입니다 텍스트 본문입니다 텍스트
              본문입니다텍스트 본문입니다 텍스트 본문입니다 텍스트 본문입니다
              텍스트 본문입니다텍스트 본문입니다 텍스트 본문입니다 텍스트
              본문입니다 텍스트 본문입니다텍스트 본문입니다 텍스트 본문입니다
              텍스트 본문입니다 텍스트 본문입니다 텍스트 본문입니다 텍스트
              본문입니다 텍스트 본문입니다 텍스트 본문입니다
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

        {/* 기존 댓글 박스 */}
        <div className="border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full max-w-md mt-[37px] flex flex-col gap-2 mb-[9.2px]">
          {/* 프로필 + 날짜 한 줄 */}
          <div className="flex text-[14px] text-[#7D7D7D] mb-[9px]">
            <div className="flex gap-[6px]">
              <Image
                src="/images/main/postprofile.svg"
                alt="post detail image"
                width={24}
                height={24}
              />
              <div>홍길동</div>
            </div>
            <div className="flex gap-[10px] ml-[24px]">
              <div>2023-02-12</div>
              <div>3시간 전</div>
            </div>
          </div>
          {/* 본문 */}
          <div className="text-[17px] mb-[8px]">
            Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </div>

          {/* 댓글 수와 댓글 좋아요 한 줄 */}
          <div className="flex gap-4 text-[14px] text-[#7D7D7D] gap-[20px]">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-[5px] rounded px-2 py-1"
            >
              <Image
                src="/images/main/commentnumber.svg"
                alt="post detail image"
                width={16}
                height={16}
              />
              댓글 수
            </button>
            <button className="flex gap-4 text-[14px] gap-[5px] text-[#7D7D7D]">
              <Image
                src="/images/main/favorite.svg"
                alt="post detail image"
                width={16}
                height={16}
              />
              좋아요
            </button>
          </div>
        </div>

        {/* 댓글 리스트가 보일 때 */}
        {showReplies && (
          <div className="w-full flex flex-col mt-4 max-w-md ml-[27px]">
            {[1, 2].map((comment) => (
              <div
                key={comment}
                className="border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full mb-[9.2px]"
                style={{ width: "calc(100% - 27px)" }}
              >
                {/* 프로필 + 날짜 */}
                <div className="flex text-[14px] text-[#7D7D7D] mb-[9px]">
                  <div className="flex gap-[6px]">
                    <Image
                      src="/images/main/postprofile.svg"
                      alt="comment profile"
                      width={24}
                      height={24}
                    />
                    <div>댓글작성자{comment}</div>
                  </div>
                  <div className="flex gap-[10px] ml-[24px]">
                    <div>2024-01-0{comment}</div>
                    <div>{comment * 2}시간 전</div>
                  </div>
                </div>

                {/* 본문 */}
                <div className="text-[17px] mb-[8px]">
                  {comment} 번째 댓글 내용입니다. 오른쪽으로 살짝 밀려서
                  표시됩니다.
                </div>

                {/* 댓글 수/좋아요 버튼 */}
                <div className="flex gap-4 text-[14px] text-[#7D7D7D] mt-2 gap-[20px]">
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className="flex items-center gap-[5px] rounded px-2 py-1"
                  >
                    <Image
                      src="/images/main/commentnumber.svg"
                      alt="post detail image"
                      width={16}
                      height={16}
                    />
                    댓글 수
                  </button>
                  <button className="flex gap-4 text-[14px] gap-[5px] text-[#7D7D7D]">
                    <Image
                      src="/images/main/favorite.svg"
                      alt="post detail image"
                      width={16}
                      height={16}
                    />
                    좋아요
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
