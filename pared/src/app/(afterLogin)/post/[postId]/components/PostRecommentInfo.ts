import { create } from "zustand";

interface PostRecommentInfo {
  showReplies: boolean[];
  likeCnt:number;
  setLikeCnt: (likeCnt:number)=>void;
  setShowReplies: (index: number) => void;
  initShowReplies: (count: number) => void;
}

export const usePostRecommentInfo = create<PostRecommentInfo>((set, get) => ({
  showReplies: [],    // ← 초기값은 빈 배열로 설정
    likeCnt:0,
    setLikeCnt: (likeCnt)=>set({likeCnt}),
  setShowReplies: (index) =>
    set((state) => {
      const newItems = [...state.showReplies]; // 이제 오류 없음
      newItems[index] = !newItems[index];
      return { showReplies: newItems };
    }),

  initShowReplies: (count) =>
    set(() => ({
      showReplies: Array(count).fill(false), // 서버 데이터 개수만큼 false 배열 생성
    })),
}));
