"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/utils/ApiClient";
import Comment from "./Comment";

export default function CommentSection({ postId, commentCount: initialCount }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [commentCount, setCommentCount] = useState(initialCount);

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const url = `/api/posts/${postId}/comments${cursor ? `?cursor=${cursor}` : ""}`;
      const data = await apiClient(url);
      setComments((prev) => [...prev, ...data.comments]);
      setCursor(data.nextCursor);
      setShowComments(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [postId, cursor]);

  const handleSubmitComment = async () => {
    if (!commentContent.trim() || submitting) return;
    setSubmitting(true);
    try {
      const comment = await apiClient(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: commentContent.trim() }),
      });
      setComments((prev) => [...prev, comment]);
      setCommentContent("");
      setShowComments(true);
      setCommentCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "0 24px 12px" }}>
      {commentCount > 0 && !showComments && (
        <button
          onClick={loadComments}
          disabled={loading}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            color: "#377DFF",
            fontWeight: 500,
            padding: "4px 0",
          }}
        >
          {loading
            ? "Loading..."
            : `View ${commentCount} ${commentCount === 1 ? "comment" : "comments"}`}
        </button>
      )}

      {showComments && (
        <div style={{ marginTop: "8px" }}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {cursor && (
            <button
              onClick={loadComments}
              disabled={loading}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                color: "#377DFF",
                marginBottom: "8px",
              }}
            >
              {loading ? "Loading..." : "Load more comments"}
            </button>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="form-control"
          style={{
            fontSize: "13px",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
        />
        <button
          onClick={handleSubmitComment}
          disabled={submitting || !commentContent.trim()}
          style={{
            background: "#377DFF",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "8px 20px",
            fontSize: "13px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {submitting ? "..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
