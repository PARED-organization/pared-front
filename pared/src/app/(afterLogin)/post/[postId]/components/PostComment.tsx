import Image from "next/image";
import ImageServe from "./ImageServe";
import { usePostRecommentInfo } from "./PostRecommentInfo";
import MoreMenu from "./MoreMenu";
import CommentsInput from "./CommentsInput";
import { useState } from "react";
import { ArrowBigRight } from "lucide-react";
import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import { useModalStore } from "@/app/(beforeLogin)/login/_component/useModalStore";
import { useReportModalStore } from "./ReportModalState";
import ParedModal from "@/app/(beforeLogin)/login/_component/ParedModal";
import ParedReportModal from "./ParedReportModal";
export default function PostComment({idx,comment,articleId,currentUser}){
  const isLogined = currentUser ? true : false;

    const imageSrc = ImageServe(comment.commenter.profilePic.link);
    const {showReplies,setShowReplies,recomments,initShowReplies,setCommentsAndRecomments} = usePostRecommentInfo();
    const [replies,setReplies] = useState([]);
    const [recomment,setRecomment] = useState('');
    const [mentionCommenter,setMentionCommenter] = useState(0);
    const [parentCommentId,setParentCommentId] = useState(0);
    const [commentState,setCommentState] = useState(comment);
    const [repliesState,setRepliesState] = useState([]);
    
    const {openModal,closeModal} = useModalStore();
    const {openReportModal} = useReportModalStore();

    const recommentSubmit = async ()=>{
            
            const res = await api.post("/api/v1/comment/write-recomment",{
                articleId:articleId,
                parentCommentId:comment.id,
                targetId:mentionCommenter,
                content:recomment
            })
            
            if(res.data.status==="SUCCESS"){
              setReplies(res.data.data.reCommentDTOList);
                setRecomment("");
                setRepliesState(res.data.data.reCommentDTOList);
                
            }

    }

    const unLoginedAction = ()=>{
      if(!isLogined){
          openModal("로그인 후 이용할 수 있습니다.")
      return false;
      }else{
        return true;
      }
    }

const likeClick = async (id)=>{
  
    const res = await api.post("/api/v1/comment/increase-like",{
      likeTopic:'COMMENT',
        id:id
    });
    if(res.data.status==="SUCCESS"){
        
        setCommentState(prev=>({
            ...prev,
            likeCnt: res.data.data.currentCommentLikeCnt,
            isCurrentUserLiked: !prev.isCurrentUserLiked
        }))
    }
  }
    const unLikeClick = async (id)=>{
      if(!unLoginedAction())
      return;
    const res = await api.post("/api/v1/comment/decrease-like",{
      likeTopic:'COMMENT',
        id:id
    });
    if(res.data.status==="SUCCESS"){
        setCommentState(prev=>({
            ...prev,
            likeCnt: res.data.data.currentCommentLikeCnt,
            isCurrentUserLiked: !prev.isCurrentUserLiked
        }))
    }
  }

  const likeRecommentClick = async (id,idx)=>{
    
    const res = await api.post("/api/v1/comment/increase-like",{
      likeTopic:'RECOMMENT',
        id:id
    });
    if(res.data.status==="SUCCESS"){
        setRepliesState((prev)=>
        prev.map((c,index)=> index===idx ? {
            ...c,
            likeCnt : res.data.data.currentCommentLikeCnt,
            isCurrentUserLiked : !c.isCurrentUserLiked,
        }
    :c
))
    }
  }
    const unLikeRecommentClick = async (id,idx)=>{
      
    const res = await api.post("/api/v1/comment/decrease-like",{
      likeTopic:'RECOMMENT',
        id:id
    });
    if(res.data.status==="SUCCESS"){
        setRepliesState((prev)=>
        prev.map((c,index)=> index===idx ? {
            ...c,
            likeCnt : res.data.data.currentCommentLikeCnt,
            isCurrentUserLiked : !c.isCurrentUserLiked,
        }
    :c
))
    }
  }

  const reportComment =async (commentId,targetId,content)=>{
    if(!unLoginedAction())
      return;
        const res = await api.post("api/v1/comment/report-comment",{
            commentId:commentId,
            targetUserId: targetId,
            content: content
        });

        if(res.data.status === "SUCCESS"){
            openModal("신고에 성공하였습니다.")
        }else{
            openModal("권한이 없습니다.")
        }
  }

  const deleteComment = async(id)=>{
    if(!unLoginedAction())
      return;
    const res = await api.delete(`/api/v1/comment/delete-comment/${id}`);

    if(res.data.status==="SUCCESS"){
            openModal("삭제에 성공하였습니다.",{
                onConfirm:()=>location.reload(),
                showCancelButton:false
            })
        }else{
            openModal("권한이 없습니다.")
        }
  }

  const getReplies = async(id)=>{
    const res = await api.get(`/api/v1/comment/read-recomments/${id}`,{
      params:{articleId:articleId}}
    );

    if(res.data.status==="SUCCESS"){

      setReplies(res.data.data.reCommentDTOList);
      setRepliesState(res.data.data.reCommentDTOList);
    }
  }

    return(
            <>
            <ParedModal/>
            <ParedReportModal/>
                <div className="border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full max-w-md mt-[37px] flex flex-col gap-2 mb-[9.2px]">
          {/* 프로필 + 날짜 한 줄 */}
          <div className="flex flex-row text-[14px] text-[#7D7D7D] mb-[9px] justify-between h-[70px]">
  <div className="flex flex-row">
    <div className="flex gap-[6px]">

      {/* 동그란 프로필 이미지 */}
      <div className="w-[48px] h-[48px] border-[#FF9466] border-[2px] rounded-full overflow-hidden">
        <Image
          src={imageSrc}
          alt="post detail image"
          width={48}
          height={48}
          quality={100}
          className="object-fill w-[48px] h-[48px]"
        />
      </div>
        <div className="flex flex-col">
            <div>{comment.commenter.nickName}</div>
            <div>{comment.commenter.paredRole}</div>
        </div>
      
    </div>

    <div className="flex gap-[10px] ml-[24px]">
      <div>{comment.baseTime.createdDate}</div>
      <div>3시간 전</div>
    </div>
  </div>

  <div>
    {
        isLogined && comment.commenter.id === currentUser.id
        ?
        <MoreMenu
    onDelete={() => openModal("삭제하시겠습니까?",{
                            onConfirm:()=>deleteComment(comment.id),
                            onCancel:()=>closeModal(),
                            showCancelButton:true
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
        openReportModal({
        targetId:comment.id,
        id:comment.commenter.id,
        nickname:comment.commenter.nickName,
        profilePic: ImageServe(comment.commenter.profilePic.link)
      },(content)=>reportComment(comment.id,comment.commenter.id,content))}}
      onCopyLink={() => {
        navigator.clipboard.writeText(window.location.href);
        openModal("링크가 복사되었습니다.")
      }}
    />
    }
    
  </div>
</div>

          {/* 본문 */}
          <div className="text-[17px] mb-[8px] whitespace-pre-wrap">
            {comment.content}
          </div>

          <div className="flex gap-4 text-[14px] text-[#7D7D7D] gap-[20px]">
            <button
              onClick={() => {
                setShowReplies(idx);
                getReplies(comment.id);
                setMentionCommenter(comment.commenter.id);
            }}
              className="flex items-center gap-[5px] rounded px-2 py-1"
            >
              <Image
                src="/images/main/commentnumber.svg"
                alt="post detail image"
                width={16}
                height={16}
              />
              {comment.recommentCnt}
            </button>
            <button className="flex gap-4 text-[14px] gap-[5px] text-[#7D7D7D]" onClick={()=>{
                if(commentState.isCurrentUserLiked){
                  if(!unLoginedAction()){
                    return;
                  }else{
                      unLikeClick(commentState.id);
                  }
                    
                }else{
                  if(!unLoginedAction())
                      return;
                    else{
                        likeClick(commentState.id);
                    }
                    
                }
            }}>
              {commentState.isCurrentUserLiked ? "❤️" :"🤍"}
              
              {commentState.likeCnt}
            </button>
          </div>
        </div>

        {showReplies[idx] && (
        <div>
            <div className="w-full flex flex-col mt-4 max-w-md ml-[27px]">
            {
            replies.map((data,idx) => (
              <div
                key={data.id}
                className="border border-[#FF9466] rounded-[20px] px-[12px] py-[19px] w-full mb-[9.2px]"
                style={{ width: "calc(100% - 27px)" }}
              >
                {/* 프로필 + 날짜 */}
                <div className="flex text-[14px] text-[#7D7D7D] mb-[9px] justify-between items-center">
                    <div className="flex flex-row">
                        <div className="flex gap-[6px]">
                    <Image
                      src={ImageServe(data.recommenter.profilePic.link)}
                      alt="comment profile"
                      width={24}
                      height={24}
                    />
                    <div>{data.recommenter.nickName}</div>
                  </div>
                  <div className="flex gap-[10px] ml-[24px]">
                    <div>{data.baseTime.createdDate}</div>
                    <div>3시간 전</div>
                  </div>

                    </div>
                    <div>
                        {
                            isLogined && data.recommenter.id === currentUser.id
                            ?
                            <MoreMenu
                          
                          onDelete={() => openModal("삭제하시겠습니까?",{
                            onConfirm:()=>deleteComment(data.id),
                            onCancel:()=>closeModal(),
                            showCancelButton:true
                          })}
                          onCopyLink={() => {
                            navigator.clipboard.writeText(window.location.href);
                            openModal("링크가 복사되었습니다.")
                          }}
                        />
                        :
                        <MoreMenu
                          
                          
                          onReport={() => {
                            if(!unLoginedAction()){
                              return
                            }else{
                                openReportModal({
                            targetId:data.id,
                            id:data.recommenter.id,
                            nickname:data.recommenter.nickName,
                            profilePic:ImageServe(data.commenter.profilePic.link)
                          },(content)=>reportComment(data.id,data.recommenter.id,content))}
                            }
                            

                          }
                          onCopyLink={() => {
                            navigator.clipboard.writeText(window.location.href);
                            openModal("링크가 복사되었습니다.")
                          }}
                        />

                        }
                        
                    </div>
                  
                </div>

                {/* 본문 */}
                <div className="text-[17px] mb-[8px] whitespace-pre-wrap">
                  {data.content} 
                </div>

                {/* 댓글 수/좋아요 버튼 */}
                <div className="flex gap-4 text-[14px] text-[#7D7D7D] mt-2 gap-[20px]">
                  <button className="flex gap-4 text-[14px] gap-[5px] text-[#7D7D7D]" onClick={()=>{
                if(repliesState[idx].isCurrentUserLiked){
                  if(!unLoginedAction())
                      return;
                    else{
                        unLikeRecommentClick(repliesState[idx].id,idx);
                    }
                    
                }else{
                    if(!unLoginedAction())
                      return;
                    else{
                        likeRecommentClick(repliesState[idx].id,idx);
                    }
                    
                }
                  }}>
                    
                    {repliesState[idx].isCurrentUserLiked ? "❤️" :"🤍"}

                    {repliesState[idx].likeCnt}
                    
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={`inline-flex items-center border border-[#FF9466] rounded-[20px]  px-[12px] py-[19px] w-full max-w-md ml-[27px]`}>
      <textarea
        value={recomment}
        onChange={
            
            (e)=>{
                
                setRecomment(e.target.value)
e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
            }
            
        }
        className="flex-grow h-full border-none outline-none resize-none"
        placeholder="댓글을 입력해주세요"
      />
      <ArrowBigRight
        className="text-[#FF9466]"
        onClick={()=>recommentSubmit()}
        width={39}
        height={48}
      />
    </div>
          
        </div>

          
        )}
            </>
    );
}
{/* 기존 댓글 박스 */}
        