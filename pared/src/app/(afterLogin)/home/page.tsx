"use client";

import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";
import NoticeBoard from "./components/NoticeBoard";
import PostGrid from "./components/Post";

const boards = {
  자유게시판: [
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    {
      author: "김가나",
      question: "말이 느린 아이를 도와주는 방법은?",
      detail:
        "아이가 또래보다 말을 잘하지 못하는 편인데 어떻게 도와줄 수 있을까요?",
      comments: 2,
      views: 15,
      likes: 4,
    },
    // 자유게시판 게시글 추가 가능
  ],
  정보게시판: [
    {
      author: "박철수",
      question: "좋은 육아 정보를 공유해 주세요.",
      detail: "육아에 도움되는 좋은 정보가 있으면 알려주세요.",
      comments: 1,
      views: 10,
      likes: 3,
    },
  ],
  QnA: [
    {
      author: "이영희",
      question: "아이가 밤에 잠을 잘 자게 하는 방법은?",
      detail: "밤에 아이가 자주 깨는데 어떻게 해야 할까요?",
      comments: 3,
      views: 20,
      likes: 10,
    },
  ],
};

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-white bg-[url('/images/common/gradient_bg.png')] bg-cover bg-center flex flex-col items-center">
      <Header />
      <BannerSlider />
      <section className="w-full flex gap-[39px] px-[70px]">
        <NoticeBoard />
        <PostGrid boards={boards} />
      </section>
    </main>
  );
}
