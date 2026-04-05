"use client";

import { useState, useCallback } from "react";
import LikeButton from "../like/LikeButton";

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function ReplyItem({ reply }) {
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

function CommentItem({ comment }) {
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
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReplies((prev) => [...prev, ...data.replies]);
        setReplyCursor(data.nextCursor);
        setShowReplies(true);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingReplies(false);
    }
  }, [comment.id, replyCursor]);

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || submittingReply) return;
    setSubmittingReply(true);

    try {
      const res = await fetch(`/api/comments/${comment.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent.trim() }),
      });

      if (res.ok) {
        const reply = await res.json();
        setReplies((prev) => [...prev, reply]);
        setReplyContent("");
        setShowReplyInput(false);
        setShowReplies(true);
        setReplyCount((prev) => prev + 1);
      }
    } catch {
      // Silently fail
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
        replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}

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
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, ...data.comments]);
        setCursor(data.nextCursor);
        setShowComments(true);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [postId, cursor]);

  const handleSubmitComment = async () => {
    if (!commentContent.trim() || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent.trim() }),
      });

      if (res.ok) {
        const comment = await res.json();
        setComments((prev) => [...prev, comment]);
        setCommentContent("");
        setShowComments(true);
        setCommentCount((prev) => prev + 1);
      }
    } catch {
      // Silently fail
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
            <CommentItem key={comment.id} comment={comment} />
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
