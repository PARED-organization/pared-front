export default function NoticeBoard() {
  return (
    <div className="w-[619px] text-[#ffffff] flex flex-col">
      {/* 공지사항 타이틀 */}
      <div className="w-[108px] h-[35px] bg-[#FF9466] rounded-full flex items-center justify-center mb-[20px]">
        <span className="text-white text-[18px] font-semibold">공지사항</span>
      </div>

      {/* 헤더 */}
      <div className="flex bg-[#FF9466] rounded-t-[8px] overflow-hidden h-[40px]">
        {["No", "작성자", "제목"].map((title, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center border-r border-[#D4D5E1] ${
              idx === 0 ? "w-[50px]" : idx === 1 ? "w-[218px]" : "w-[338px]"
            }`}
          >
            <span className="text-[#505768] text-[13px] font-medium leading-none">
              {title}
            </span>
          </div>
        ))}
      </div>

      {/* 본문 데이터 */}
      <div className="flex flex-col bg-white rounded-b-[8px] overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex h-[40px] border-b border-[#EEEDF4]">
            <div className="w-[50px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                {index + 1}
              </span>
            </div>
            <div className="w-[218px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                홍길동
              </span>
            </div>
            <div className="w-[338px] flex items-center justify-center">
              <span className="text-[#656D7E] text-[14px] leading-none">
                특강 공지입니다.
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
