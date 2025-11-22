import Image from "next/image";
import ImageServe from "./ImageServe";
import { usePostRecommentInfo } from "./PostRecommentInfo";


export default function PostComment({idx,comment}){

    const imageSrc = ImageServe(comment.commenter.profilePic.link);
    const {showReplies,setShowReplies,recomments} = usePostRecommentInfo();
    const replies = recomments[comment.id] ?? [];
    console.log(replies);
    return(
            <>
                <div className="border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full max-w-md mt-[37px] flex flex-col gap-2 mb-[9.2px]">
          {/* 프로필 + 날짜 한 줄 */}
          <div className="flex text-[14px] text-[#7D7D7D] mb-[9px]">
            <div className="flex gap-[6px]">
              <Image
                src={imageSrc}
                alt="post detail image"
                width={24}
                height={24}
              />
              <div>{comment.commenter.nickName}</div>
            </div>
            <div className="flex gap-[10px] ml-[24px]">
              <div>{comment.baseTime.createdDate}</div>
              <div>3시간 전</div>
            </div>
          </div>
          {/* 본문 */}
          <div className="text-[17px] mb-[8px]">
            {comment.content}
          </div>

          <div className="flex gap-4 text-[14px] text-[#7D7D7D] gap-[20px]">
            <button
              onClick={() => setShowReplies(idx)}
              className="flex items-center gap-[5px] rounded px-2 py-1"
            >
              <Image
                src="/images/main/commentnumber.svg"
                alt="post detail image"
                width={16}
                height={16}
              />
              {replies.length}
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

        {showReplies[idx] && (
          <div className="w-full flex flex-col mt-4 max-w-md ml-[27px]">
            {replies.map((data) => (
              <div
                key={data.id}
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
                    <div>{data.commenter.nickName}</div>
                  </div>
                  <div className="flex gap-[10px] ml-[24px]">
                    <div>{data.baseTime.createdDate}</div>
                    <div>3시간 전</div>
                  </div>
                </div>

                {/* 본문 */}
                <div className="text-[17px] mb-[8px]">
                  {data.content} 
                </div>

                {/* 댓글 수/좋아요 버튼 */}
                <div className="flex gap-4 text-[14px] text-[#7D7D7D] mt-2 gap-[20px]">
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
            </>
    );
}
{/* 기존 댓글 박스 */}
        