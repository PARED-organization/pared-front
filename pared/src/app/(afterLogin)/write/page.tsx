"use client";
// Main Write Component
import { useState, useRef } from "react";
import Header from "../home/components/Header";
import VisibilityRadio from "../write/components/VisibilityRadio";
import CommentToggle from "../write/components/CommentToggle";
import FileUpload from "../write/components/FileUpload";
import FileList from "../write/components/FileList";

export default function Write() {
  const [visibility, setVisibility] = useState("members");
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const inputRef = useRef(null);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "0 330px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
            marginBottom: 34,
          }}
        >
          <VisibilityRadio
            visibility={visibility}
            setVisibility={setVisibility}
          />
          <div style={{ marginLeft: 92 }}>
            <CommentToggle
              isToggleOn={isToggleOn}
              setIsToggleOn={setIsToggleOn}
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="공지사항 제목을 입력하세요"
            className="w-full h-[32px] border border-[#FF9466] mb-[20px] px-[12px] py-[6px] text-[16px] rounded-[4px]"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="글자수를 입력하세요"
            className="w-full h-[303px] border border-[#FF9466] mb-[40px] px-[12px] py-[6px] text-[16px] rounded-[4px]"
          />
        </div>

        <FileUpload
          dragActive={dragActive}
          setDragActive={setDragActive}
          files={files}
          setFiles={setFiles}
          inputRef={inputRef}
        />

        <FileList files={files} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Container for the tag input and tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {/* Tag Input Field */}
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
              style={{
                width: "179px",
                height: "44px",
                border: "1px solid #FF9466",
                padding: "6px 12px",
                fontSize: "16px",
                borderRadius: "4px",
              }}
            />

            {/* Display Tags */}
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#FF9466",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                onClick={() => removeTag(tag)}
              >
                #{tag}
                <span style={{ fontWeight: "bold" }}>x</span>
              </div>
            ))}
          </div>

          <div className="flex gap-[25px]">
            <div className="w-[110px] h-[42px] flex items-center justify-center border border-[#FF9466] rounded-[4px] bg-white text-[#FF9466] hover:bg-[#FF9466] hover:text-[#ffffff] ">
              임시저장
            </div>
            <div className="w-[110px] h-[42px] flex items-center justify-center border border-[#FF9466] rounded-[4px] bg-white text-[#FF9466] hover:bg-[#FF9466] hover:text-[#ffffff] ">
              다음
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
