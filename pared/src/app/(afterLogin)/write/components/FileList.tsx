// File List Component
function FileList({ files }) {
  return (
    files.length > 0 && (
      <div
        style={{
          border: "1px solid #FF9466",
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "40px",
          maxHeight: "150px",
          overflowY: "auto",
          backgroundColor: "#FFF4E6",
          fontSize: "14px",
          color: "#333",
        }}
      >
        <strong>선택된 파일:</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
          {files.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
export default FileList;
