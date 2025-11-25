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
    profilePic:ProfilePic;
}
interface CommentDTO {
  id: number;
  parentCommentId: number | null;
  content: string;
  baseTime: BaseTime;
  commenter:UserDTO;
  mentionMember:UserDTO;
  likeCnt:number;
  isCurrentUserLiked:boolean;
}

interface PostRecommentInfo {
  showReplies: boolean[];
  likeCnt: number;
    writeComment:string;
    
  comments: CommentDTO[];
  recomments: Record<number, CommentDTO[]>;

    setWriteComment:(writeComment:string)=>void;
  setLikeCnt: (likeCnt: number) => void;
  setShowReplies: (index: number) => void;
  initShowReplies: (count: number) => void;
    setComments:(added:CommentDTO[])=>void;
}

export const usePostRecommentInfo = create<PostRecommentInfo>((set, get) => ({
  showReplies: [],
  likeCnt: 0,
    writeComment:'',
  comments: [],
  recomments: {},
    setWriteComment: (writeComment:string)=>set({writeComment:writeComment}),
  setLikeCnt: (likeCnt) => set({ likeCnt }),
     setComments: (added) =>
    set((state) => ({
      comments: [...state.comments, ...added],
    })),
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


    
}));
