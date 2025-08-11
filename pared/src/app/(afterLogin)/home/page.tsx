"use client";

import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";
import NoticeBoard from "./components/NoticeBoard";
import PostSlider from "./components/PostSlider";

const posts = [
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
    author: "이하나",
    question: "아이 집중력 향상 방법은?",
    detail: "놀이 중 집중을 잘 못하는데 어떻게 하면 좋아질까요?",
    comments: 1,
    views: 8,
    likes: 2,
  },
  {
    author: "박다정",
    question: "분리불안 어떻게 극복하나요?",
    detail: "엄마 떨어지면 많이 울어요…",
    comments: 3,
    views: 10,
    likes: 3,
  },
];

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-white bg-[url('/images/common/gradient_bg.png')] bg-cover bg-center flex flex-col items-center">
      <Header />
      <BannerSlider />
      <section className="w-full flex justify-center gap-[76px] px-[210px]">
        <NoticeBoard />
        <PostSlider title="자유게시판" posts={posts} />
        <PostSlider title="Q&A" posts={posts} />
      </section>
    </main>
  );
}
