// Comment Toggle Component
function CommentToggle({ isToggleOn, setIsToggleOn }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span>인증유저만 댓글가능</span>
      <button
        onClick={() => setIsToggleOn(!isToggleOn)}
        aria-pressed={isToggleOn}
        aria-label="인증유저만 댓글 가능 토글"
        type="button"
        style={{
          width: 56,
          height: 28,
          backgroundColor: isToggleOn ? "#FFB875" : "#A3A3A3",
          borderRadius: 9999,
          padding: 4,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          transition: "background-color 0.3s",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: isToggleOn ? "#FFFFFF" : "#666666",
            borderRadius: "50%",
            boxShadow: "0 0 2px rgba(0,0,0,0.3)",
            transform: isToggleOn ? "translateX(28px)" : "translateX(0)",
            transition: "transform 0.3s, background-color 0.3s",
          }}
        />
      </button>
    </div>
  );
}
export default CommentToggle;
