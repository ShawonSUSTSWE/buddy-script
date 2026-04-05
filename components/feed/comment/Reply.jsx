import { timeAgo } from "@/lib/utils/UserUtils";
import LikeButton from "../like/LikeButton";

export default function Reply({ reply }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "8px 0",
        marginLeft: "40px",
      }}
    >
      <img
        src={reply.author.avatarUrl || "/assets/images/profile.png"}
        alt=""
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            background: "#f0f2f5",
            borderRadius: "12px",
            padding: "8px 12px",
          }}
        >
          <p style={{ fontWeight: 600, fontSize: "13px", margin: 0 }}>
            {reply.author.firstName} {reply.author.lastName}
          </p>
          <p style={{ fontSize: "13px", margin: 0, color: "#333" }}>
            {reply.content}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "4px",
            fontSize: "12px",
            color: "#999",
          }}
        >
          <LikeButton
            entityType="reply"
            entityId={reply.id}
            initialLiked={reply.userLiked}
            initialCount={reply.likeCount}
          />
          <span>{timeAgo(reply.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
