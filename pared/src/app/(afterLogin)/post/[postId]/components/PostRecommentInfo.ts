import { create } from "zustand";

interface BaseTime{
    createdDate:string;
    lastModifiedDate:string;
    deletedDate:string;
    isDeleted:string;
}
interface ProfilePic{
    id:number;
    link:string;
    extension:'string'
}
interface UserDTO{
    id:number;
    nickName:string;
    paredRole:string;
    profliePic:ProfilePic;
}
interface CommentDTO {
  id: number;
  parentCommentId: number | null;
  content: string;
  baseTime: BaseTime;
  commenter:UserDTO;
  mentionMember:UserDTO;
  
}

interface PostRecommentInfo {
  showReplies: boolean[];
  likeCnt: number;

  comments: CommentDTO[];
  recomments: Record<number, CommentDTO[]>;

  setLikeCnt: (likeCnt: number) => void;
  setShowReplies: (index: number) => void;
  initShowReplies: (count: number) => void;

  setCommentsAndRecomments: (list: CommentDTO[]) => void;
}

export const usePostRecommentInfo = create<PostRecommentInfo>((set, get) => ({
  showReplies: [],
  likeCnt: 0,

  comments: [],
  recomments: {},

  setLikeCnt: (likeCnt) => set({ likeCnt }),

  setShowReplies: (index) =>
    set((state) => {
      const newItems = [...state.showReplies];
      newItems[index] = !newItems[index];
      return { showReplies: newItems };
    }),

  initShowReplies: (count) =>
    set(() => ({
      showReplies: Array(count).fill(false),
    })),

  /** ------------------------------
   * 전체 댓글 리스트를 넣으면
   * 부모 댓글 / 대댓글 자동 분리
   * ------------------------------ */
  setCommentsAndRecomments: (list: CommentDTO[]) =>
    set(() => {
      const parentComments: CommentDTO[] = [];
      const childComments: Record<number, CommentDTO[]> = {};

      list.forEach((c) => {
        if (c.parentCommentId === null) {
          parentComments.push(c);
        } else {
          if (!childComments[c.parentCommentId]) {
            childComments[c.parentCommentId] = [];
          }
          childComments[c.parentCommentId].push(c);
        }
      });
      console.log(childComments);
      return {
        comments: parentComments,
        recomments: childComments,
        showReplies: Array(parentComments.length).fill(false), // 부모댓글 수만큼 UI 초기화
      };
    }),
}));
