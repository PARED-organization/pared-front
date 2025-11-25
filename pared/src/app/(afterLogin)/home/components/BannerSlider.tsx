"use client";

import { useState } from "react";
import Image from "next/image";
import ImageServe from "../../post/[postId]/components/ImageServe";



export default function BannerSlider({banner}) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerImages = banner.noticeDTOList;
  const next = () =>
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
  const prev = () =>
    setCurrentBanner(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );

  return (
    <div className="relative w-full h-[406px] mb-[76px] flex items-center justify-center overflow-hidden">
      <Image
        src={ImageServe(bannerImages[currentBanner].thumbnail.link)}
        alt="Main Banner"
        width={1920}
        height={406}
        className="object-cover w-[1920px] h-[406px]"
      />
      <button
        onClick={prev}
        className="absolute left-[60px] top-1/2 -translate-y-1/2 z-10"
      >
        <Image
          src="/images/main/arrow.svg"
          alt="Prev"
          width={124}
          height={124}
        />
      </button>
      <button
        onClick={next}
        className="absolute right-[60px] top-1/2 -translate-y-1/2 z-10"
      >
        <Image
          src="/images/main/arrow1.svg"
          alt="Next"
          width={124}
          height={124}
        />
      </button>
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-[10px]">
        {bannerImages.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-[12px] h-[12px] rounded-full cursor-pointer ${
              currentBanner === index ? "bg-[#FF9466]" : "bg-[#D4D5E1]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
