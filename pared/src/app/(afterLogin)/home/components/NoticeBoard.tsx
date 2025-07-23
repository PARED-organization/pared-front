export default function NoticeBoard() {
  return (
    <div className="w-full text-[#ffffff] flex flex-col">
      <div className="w-[108px] h-[35px] bg-[#FF9466] rounded-full flex items-center justify-center mb-[20px]">
        <span className="text-white text-[18px] font-semibold">공지사항</span>
      </div>
      <div className="flex bg-[#FFB875] rounded-t-[8px] overflow-hidden h-[40px]">
        {["No", "작성자", "제목", "조회수", "좋아요"].map((title, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center border-r border-[#D4D5E1] ${
              idx === 0
                ? "w-[50px]"
                : idx === 1
                ? "w-[100px]"
                : idx === 2
                ? "w-[240px]"
                : "w-[80px]"
            }`}
          >
            <span className="text-[#505768] text-[13px] font-medium leading-none">
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-white rounded-b-[8px] overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex h-[40px] border-b border-[#EEEDF4]">
            <div className="w-[50px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                {index + 1}
              </span>
            </div>
            <div className="w-[100px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                홍길동
              </span>
            </div>
            <div className="w-[240px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                특강 공지입니다.
              </span>
            </div>
            <div className="w-[80px] flex items-center justify-center border-r border-[#F0F0F0]">
              <span className="text-[#656D7E] text-[14px] leading-none">
                {34 - index}회
              </span>
            </div>
            <div className="w-[80px] flex items-center justify-center">
              <span className="text-[#656D7E] text-[14px] leading-none">
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
