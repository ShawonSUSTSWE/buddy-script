"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import LikeButton from "../like/LikeButton";
import CommentSection from "../comment/CommentSection";
import { timeAgo } from "@/lib/utils/UserUtils";

export default function PostCard({ post, onDelete }) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isAuthor = session?.user?.id === post.author.id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete?.(post.id);
      }
    } catch {
      // Silently fail
    } finally {
      setDeleting(false);
      setShowDropdown(false);
    }
  };

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img
                src={post.author.avatarUrl || "/assets/images/post_img.png"}
                alt=""
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author.firstName} {post.author.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {timeAgo(post.createdAt)} .{" "}
                <span style={{ color: post.isPrivate ? "#ff6b6b" : "#377DFF" }}>
                  {post.isPrivate ? "🔒 Private" : "🌐 Public"}
                </span>
              </p>
            </div>
          </div>

          {isAuthor && (
            <div
              className="_feed_inner_timeline_post_box_dropdown"
              style={{ position: "relative" }}
            >
              <div className="_feed_timeline_post_dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="_feed_timeline_post_dropdown_link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="17"
                    fill="none"
                    viewBox="0 0 4 17"
                  >
                    <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                    <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                    <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                  </svg>
                </button>
              </div>

              {showDropdown && (
                <div
                  className="_feed_timeline_dropdown _timeline_dropdown"
                  style={{
                    display: "block",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 10,
                  }}
                >
                  <ul className="_feed_timeline_dropdown_list">
                    <li className="_feed_timeline_dropdown_item">
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="_feed_timeline_dropdown_link"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="#1890FF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                              d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                            />
                          </svg>
                        </span>
                        {deleting ? "Deleting..." : "Delete Post"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <h4
          className="_feed_inner_timeline_post_title"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {post.content}
        </h4>

        {post.imageUrl && (
          <div className="_feed_inner_timeline_image">
            <img
              src={post.imageUrl}
              alt="Post image"
              className="_time_img"
              style={{
                maxHeight: "500px",
                objectFit: "cover",
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>

      {/* Reactions bar */}
      <div
        className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26"
        style={{ marginTop: "12px" }}
      >
        <div
          className="_feed_inner_timeline_total_reacts_image"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LikeButton
            entityType="post"
            entityId={post.id}
            initialLiked={post.userLiked}
            initialCount={post.likeCount}
          />
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <span>{post.commentCount}</span>{" "}
            {post.commentCount === 1 ? "Comment" : "Comments"}
          </p>
        </div>
      </div>

      {/* Comments */}
      <CommentSection postId={post.id} commentCount={post.commentCount} />
    </div>
  );
}
