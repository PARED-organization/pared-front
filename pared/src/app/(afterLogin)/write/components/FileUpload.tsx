// File Upload Component
import Image from "next/image";

function FileUpload({ dragActive, setDragActive, files, setFiles, inputRef }) {
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        border: "2px dashed #D4D5E1",
        borderRadius: "4px",
        padding: "20px 148px",
        backgroundColor: dragActive ? "#FFE8D9" : "transparent",
        transition: "background-color 0.3s",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        cursor: "pointer",
      }}
    >
      <Image
        src="/images/main/upload.svg"
        alt="file upload icon"
        width={38}
        height={45}
      />
      <div>
        <div
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "6px",
          }}
        >
          클릭하여 파일 선택(또는 여기로 파일을 끌어오세요)
        </div>
        <div style={{ color: "#999", fontSize: "12px" }}>
          첨부 가능 파일 용량: 파일 한 개당 최대 30mb, 모든 첨부 파일 합계 용량:
          100mb
        </div>
      </div>
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUpload;
