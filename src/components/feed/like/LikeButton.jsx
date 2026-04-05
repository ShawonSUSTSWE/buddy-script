"use client";

import { useState } from "react";
import { apiClient } from "@/lib/utils/ApiClient";

export default function LikeButton({
  entityType = "post",
  entityId,
  initialLiked = false,
  initialCount = 0,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [likers, setLikers] = useState([]);

  const apiPath =
    entityType === "post"
      ? `/api/posts/${entityId}/like`
      : entityType === "comment"
        ? `/api/comments/${entityId}/like`
        : `/api/replies/${entityId}/like`;

  const handleToggleLike = async () => {
    if (loading) return;

    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
    setLoading(true);

    try {
      const data = await apiClient(apiPath, { method: "POST" });
      setLiked(data.liked);
      setCount(data.likeCount);
    } catch {
      setLiked(liked);
      setCount(count);
    } finally {
      setLoading(false);
    }
  };

  const handleShowLikers = async () => {
    if (count === 0) return;
    try {
      const data = await apiClient(apiPath);
      setLikers(data.likes);
      setShowLikers(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <button
        onClick={handleToggleLike}
        disabled={loading}
        className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${liked ? "_feed_reaction_active" : ""}`}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          borderRadius: "4px",
          transition: "all 0.2s ease",
        }}
        title={liked ? "Unlike" : "Like"}
      >
        <span className="_feed_inner_timeline_reaction_link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            style={{
              transition: "transform 0.2s ease",
              transform: liked ? "scale(1.15)" : "scale(1)",
            }}
          >
            <path
              fill={liked ? "#377DFF" : "#666"}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </span>
      </button>

      {count > 0 && (
        <span
          onClick={handleShowLikers}
          style={{
            fontSize: "13px",
            color: liked ? "#377DFF" : "#666",
            cursor: "pointer",
            fontWeight: liked ? "600" : "400",
          }}
        >
          {count}
        </span>
      )}

      {showLikers && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowLikers(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "360px",
              width: "90%",
              maxHeight: "400px",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h5 style={{ margin: 0, fontWeight: 600 }}>Liked by</h5>
              <button
                onClick={() => setShowLikers(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            {likers.map((liker) => (
              <div
                key={liker.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 0",
                }}
              >
                <img
                  src={liker.avatarUrl || "/assets/images/profile.png"}
                  alt=""
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  {liker.firstName} {liker.lastName}
                </span>
              </div>
            ))}
            {likers.length === 0 && (
              <p style={{ color: "#999", textAlign: "center" }}>No likes yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
