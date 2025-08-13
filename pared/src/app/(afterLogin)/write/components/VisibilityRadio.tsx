// VisibilityRadio Component
function VisibilityRadio({ visibility, setVisibility }) {
  const radioOptions = [
    { id: "members", label: "회원공개" },
    { id: "public", label: "전체공개" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      {radioOptions.map((option) => (
        <label
          key={option.id}
          htmlFor={option.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 17,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span>{option.label}</span>
          <input
            type="radio"
            id={option.id}
            name="visibility"
            value={option.id}
            checked={visibility === option.id}
            onChange={() => setVisibility(option.id)}
            style={{ display: "none" }}
          />
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: visibility === option.id ? "#FFB875" : "#A3A3A3",
              boxShadow:
                visibility === option.id
                  ? "0 0 5px 2px rgba(255,184,117,0.6)"
                  : "none",
              transition: "background-color 0.3s, box-shadow 0.3s",
              position: "relative",
            }}
          >
            {visibility === option.id && (
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "4px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

export default VisibilityRadio;
