import { apiClient } from "@/lib/utils/ApiClient";
import { timeAgo } from "@/lib/utils/UserUtils";
import { useCallback, useState } from "react";
import LikeButton from "../like/LikeButton";
import Reply from "./Reply";

export default function Comment({ comment }) {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [replyCursor, setReplyCursor] = useState(null);
  const [replyCount, setReplyCount] = useState(comment.replyCount || 0);

  const loadReplies = useCallback(async () => {
    setLoadingReplies(true);
    try {
      const url = `/api/comments/${comment.id}/replies${replyCursor ? `?cursor=${replyCursor}` : ""}`;
      const data = await apiClient(url);
      setReplies((prev) => [...prev, ...data.replies]);
      setReplyCursor(data.nextCursor);
      setShowReplies(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReplies(false);
    }
  }, [comment.id, replyCursor]);

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || submittingReply) return;
    setSubmittingReply(true);
    try {
      const reply = await apiClient(`/api/comments/${comment.id}/replies`, {
        method: "POST",
        body: JSON.stringify({ content: replyContent.trim() }),
      });
      setReplies((prev) => [...prev, reply]);
      setReplyContent("");
      setShowReplyInput(false);
      setShowReplies(true);
      setReplyCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          src={comment.author.avatarUrl || "/assets/images/profile.png"}
          alt=""
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "#f0f2f5",
              borderRadius: "12px",
              padding: "10px 14px",
            }}
          >
            <p style={{ fontWeight: 600, fontSize: "13px", margin: 0 }}>
              {comment.author.firstName} {comment.author.lastName}
            </p>
            <p style={{ fontSize: "13px", margin: 0, color: "#333" }}>
              {comment.content}
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
              entityType="comment"
              entityId={comment.id}
              initialLiked={comment.userLiked}
              initialCount={comment.likeCount}
            />
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                color: "#666",
                fontWeight: 500,
              }}
            >
              Reply
            </button>
            <span>{timeAgo(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      {replyCount > 0 && !showReplies && (
        <button
          onClick={loadReplies}
          disabled={loadingReplies}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            color: "#377DFF",
            fontWeight: 500,
            marginLeft: "42px",
            marginTop: "4px",
            padding: 0,
          }}
        >
          {loadingReplies
            ? "Loading..."
            : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
        </button>
      )}

      {showReplies &&
        replies.map((reply) => <Reply key={reply.id} reply={reply} />)}

      {showReplies && replyCursor && (
        <button
          onClick={loadReplies}
          disabled={loadingReplies}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            color: "#377DFF",
            marginLeft: "42px",
            marginTop: "4px",
          }}
        >
          {loadingReplies ? "Loading..." : "Load more replies"}
        </button>
      )}

      {showReplyInput && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginLeft: "42px",
            marginTop: "8px",
          }}
        >
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="form-control"
            style={{
              fontSize: "13px",
              borderRadius: "20px",
              padding: "6px 14px",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitReply()}
          />
          <button
            onClick={handleSubmitReply}
            disabled={submittingReply || !replyContent.trim()}
            style={{
              background: "#377DFF",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {submittingReply ? "..." : "Reply"}
          </button>
        </div>
      )}
    </div>
  );
}
