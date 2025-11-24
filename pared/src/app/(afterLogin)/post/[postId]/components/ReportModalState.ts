// useReportModalStore.ts
import { create } from "zustand";

interface ReportUserInfo {
  targetId:number;
  id: number;
  nickname: string;
  profilePic: string;
}

interface ReportModalState {
  show: boolean;
  
  reportUser: ReportUserInfo | null;
  reportContent: string;
  onSubmit?: (content: string) => void;

  openReportModal: (
    targetUser: ReportUserInfo,
    onSubmit: (content: string) => void
  ) => void;

  closeReportModal: () => void;
  setReportContent: (content: string) => void;
}

export const useReportModalStore = create<ReportModalState>((set) => ({
  show: false,
  reportUser: null,
  reportContent: "",
  onSubmit: undefined,
  
  openReportModal: (targetUser, onSubmit) =>
    set({
      show: true,
      reportUser: targetUser,
      reportContent: "",
      onSubmit,
    }),

  closeReportModal: () =>
    set({
      show: false,
      reportUser: null,
      reportContent: "",
      onSubmit: undefined,
    }),

  setReportContent: (content) => set({ reportContent: content }),
}));
