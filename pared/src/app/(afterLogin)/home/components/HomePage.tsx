"use client";

import Header from "./Header";
import BannerSlider from "./BannerSlider";
import NoticeBoard from "./NoticeBoard";
import PostGrid from "./Post";



export default function HomePageDetail({entranceInfo,currentUser}) {
    
  return (
    <main className="w-full min-h-screen bg-white bg-[url('/images/common/gradient_bg.png')] bg-cover bg-center flex flex-col items-center">
      <Header />
      <BannerSlider banner={entranceInfo}/>
      <section className="w-full flex gap-[39px] px-[70px]">
        <PostGrid boards={entranceInfo} />
      </section>
    </main>
  );
}
