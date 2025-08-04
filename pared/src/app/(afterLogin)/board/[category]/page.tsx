"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../components/Header";
import Image from "next/image";

type Post =
  | {
      id: string;
      title: string;
      content: string;
      author: string;
      createdAt: string;
      question?: string;
      detail?: string;
      comments?: number;
      views?: number;
      likes?: number;
    }
  | {
      id: number;
      title: string;
      category: string;
      date: string;
      views: number;
    };

export default function BoardPage() {
  const { category } = useParams() as { category: string };

  const [posts, setPosts] = useState<Post[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "list">("list");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const dummyPosts: Post[] = Array.from({ length: 23 }, (_, i) => ({
      id: `${i + 1}`,
      title: `공지사항 ${i + 1} - 제목 예시입니다.`,
      content: `이것은 공지사항 ${i + 1}의 내용입니다.`,
      author: "관리자",
      createdAt: `2025-07-${(10 + i).toString().padStart(2, "0")}`,
      question: `질문 ${i + 1}입니다.`,
      detail: `상세 내용 ${i + 1}입니다.`,
      comments: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
    }));
    setPosts(dummyPosts);
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, viewMode]);

  // 카드 보기일 경우 강제 8개
  const effectiveItemsPerPage = viewMode === "card" ? 8 : itemsPerPage;
  const totalPages = Math.ceil(posts.length / effectiveItemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * effectiveItemsPerPage,
    currentPage * effectiveItemsPerPage
  );

  const getPaginationRange = (
    current: number,
    total: number
  ): (number | "...")[] => {
    const delta = 2;
    const range: (number | "...")[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
  };

  const paddingX = viewMode === "card" ? "px-[165px]" : "px-[200px]";
  const optionPaddingX = viewMode === "card" ? "px-[0px]" : "px-[94px]";

  return (
    <div>
      <Header />
      <div
        className={`w-full min-h-screen bg-white flex flex-col py-6 ${paddingX}`}
      >
        {/* 보기 옵션 */}
        <div
          className={`flex justify-end items-center gap-[8px] mb-[12px] mt-[145px] ${optionPaddingX}`}
        >
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center h-[34px] gap-[4px] p-[10px] rounded-full border font-semibold text-sm 
                ${
                  viewMode === "card"
                    ? "border-[#ff9365] text-[#ffb875] bg-[#fff5ec]"
                    : "border-[#d9d9d9] text-[#656d7e]"
                }
              `}
            >
              <Image
                src="/images/board/card.svg"
                alt="카드 보기"
                width={16}
                height={16}
              />
              <span>카드로 보기</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center h-[34px] gap-[4px] p-[10px] rounded-full border font-semibold text-sm
                ${
                  viewMode === "list"
                    ? "border-[#fe9466] text-[#fe9466] bg-[#fff5ec]"
                    : "border-[#d9d9d9] text-[#656d7e]"
                }
              `}
            >
              <Image
                src="/images/board/list.svg"
                alt="리스트 보기"
                width={16}
                height={16}
              />
              <span>리스트로 보기</span>
            </button>
          </div>

          {/* 리스트 보기일 때만 노출 */}
          {viewMode === "list" && (
            <div className="relative gap-[10px]">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="rounded-full font-medium pr-8 bg-white"
              >
                <option value={10}>10개씩 보기</option>
                <option value={20}>20개씩 보기</option>
                <option value={30}>30개씩 보기</option>
              </select>
            </div>
          )}
        </div>

        {/* 게시글 영역 */}
        <div className="w-full flex flex-col gap-4">
          {viewMode === "card" ? (
            <div className="flex flex-wrap justify-start gap-[34px] max-w-full">
              {paginatedPosts.map((post) => (
                <div key={post.id} className="mb-[40px]">
                  <div className="relative w-[368px] h-[255px] bg-white border border-[#FE9466] rounded-[5px] px-[20px] py-[20px] overflow-hidden gap-[34px]">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex items-center gap-[10px] px-[34px]">
                        <Image
                          src="/images/main/user.svg"
                          alt="User"
                          width={70}
                          height={66}
                        />
                        <span className="text-[#5C4033] text-[16px] font-semibold">
                          {"author" in post ? post.author : "작성자"}
                        </span>
                        <span className="text-[#000000] text-[16px] font-semibold border-[none] border-black rounded-[15px] px-[20px] py-[2px] bg-[#D9D9D9] ml-[30px]">
                          #언어
                        </span>
                      </div>
                      <p className="text-[#5C4033] text-[16px] px-[60px] leading-snug">
                        Q. {"question" in post ? post.question : ""} <br />
                        {"detail" in post ? post.detail : ""}
                      </p>
                      <div className="absolute bottom-[20px] right-[30px] flex gap-[10px] text-[#111111] text-[12px]">
                        <span className="flex items-center gap-[4px]">
                          <Image
                            src="/images/main/comment.svg"
                            alt="댓글"
                            width={20}
                            height={20}
                          />
                          {"comments" in post ? post.comments : 0}
                        </span>
                        <span className="flex items-center gap-[4px]">
                          <Image
                            src="/images/main/views.svg"
                            alt="조회수"
                            width={20}
                            height={20}
                          />
                          {"views" in post ? post.views : 0}
                        </span>
                        <span className="flex items-center gap-[4px]">
                          <Image
                            src="/images/main/like.svg"
                            alt="좋아요"
                            width={20}
                            height={20}
                          />
                          {"likes" in post ? post.likes : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedPosts.length > 0 ? (
            <table className="w-full table-fixed border-collapse h-[467px]">
              <thead>
                <tr className="bg-[#FF9466] text-[#1f2633] font-semibold text-sm">
                  <th className="w-[10%] py-[14px] px-[30px] text-left">#</th>
                  <th className="w-[60%] py-[14px] px-4 text-left text-[#ffffff]">
                    제목
                  </th>
                  <th className="w-[10%] py-[14px] px-4 text-left text-[#ffffff]">
                    작성자
                  </th>
                  <th className="w-[10%] py-[14px] px-4 text-left text-[#ffffff]">
                    작성일
                  </th>
                  <th className="w-[10%] py-[14px] px-4 text-left text-[#ffffff]">
                    조회수
                  </th>
                  <th className="w-[10%] py-[14px] px-4 text-left text-[#ffffff]">
                    좋아요
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-100 text-sm text-[#1f2633] border-b border-[#1f2633]"
                  >
                    <td className="py-[12px] px-[30px] ">{post.id}</td>
                    <td className="py-3 px-4 text-left">{post.title}</td>
                    <td
                      className="py-3 px-4 text-left"
                      style={{ fontWeight: "900" }}
                    >
                      {"category" in post ? post.category : post.author}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {"date" in post ? post.date : post.createdAt}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {"views" in post ? post.views : "-"}
                    </td>
                    <td className="py-3 px-4 text-left">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-400 py-10">
              해당 카테고리에 게시물이 없습니다.
            </p>
          )}

          {/* 페이지네이션 */}
          <div
            className={`flex justify-center mt-[53px] gap-[11px] ${optionPaddingX}`}
          >
            <div className="flex items-center gap-[11px]">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-30"
              >
                <Image
                  src="/images/board/lvector.svg"
                  alt="이전"
                  width={6}
                  height={11}
                />
              </button>

              {getPaginationRange(currentPage, totalPages).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    typeof item === "number" && setCurrentPage(item)
                  }
                  disabled={item === "..."}
                  className={`w-[30px] h-[30px] rounded-[8px] text-white text-[14px] font-semibold
                    ${
                      item === "..."
                        ? "bg-[#FFB875] cursor-default"
                        : currentPage === item
                        ? "bg-[#FF8C5B]"
                        : "bg-[#FFB875] hover:brightness-105"
                    }`}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="disabled:opacity-30"
              >
                <Image
                  src="/images/board/rvector.svg"
                  alt="다음"
                  width={6}
                  height={11}
                />
              </button>
            </div>
          </div>

          {/* 글 작성 버튼 */}
          <div className="flex justify-end mt-6">
            <button className="bg-[#ff9365] text-white rounded-[4px] px-[41px] py-[9px] hover:bg-[#ffb875] transition shadow-lg">
              글 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
