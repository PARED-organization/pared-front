"use client";

import { ArrowBigRight } from "lucide-react";
import { usePostRecommentInfo } from "./PostRecommentInfo";


export default function CommentInput({commentSubmit}) {

    const {writeComment,setWriteComment} = usePostRecommentInfo();

  return (
    <div className={`inline-flex items-center border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full max-w-md `}>
      <textarea
        value={writeComment}
        onChange={
            
            (e)=>{
                
                setWriteComment(e.target.value)
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
            }
            
        }
        className="flex-grow h-full border-none outline-none resize-none"
        placeholder="댓글을 입력해주세요"
      />
      <ArrowBigRight
        className="text-[#FF9466]"
        onClick={commentSubmit}
        width={39}
        height={48}
      />
    </div>
  );
}
