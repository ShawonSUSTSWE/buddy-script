"use client";

import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import LikeButton from "../like/LikeButton";
import CommentSection from "../comment/CommentSection";
import { timeAgo } from "@/lib/utils/UserUtils";
import { apiClient } from "@/lib/utils/ApiClient";
import { showSuccess } from "@/lib/utils/ToastUtils";

export default function PostCard({ post, onDelete }) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const isAuthor = String(session?.user?.id) === String(post.author.id);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.right - 160,
      });
    }
    setShowDropdown((prev) => !prev);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiClient(`/api/posts/${post.id}`, { method: "DELETE" });
      showSuccess("Post deleted successfully");
      onDelete?.(post.id);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
                {timeAgo(post.createdAt)}{" "}
                {isAuthor && (
                  <span
                    style={{ color: post.isPrivate ? "#ff6b6b" : "#377DFF" }}
                  >
                    {post.isPrivate ? "🔒 Private" : "🌐 Public"}
                  </span>
                )}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="_feed_inner_timeline_post_box_dropdown">
              <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="_feed_timeline_post_dropdown_link"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
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

              {showDropdown &&
                createPortal(
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "fixed",
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                      zIndex: 99999,
                      background: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      minWidth: "160px",
                      padding: "4px 0",
                    }}
                  >
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li>
                        <button
                          onClick={handleDelete}
                          disabled={deleting}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: deleting ? "not-allowed" : "pointer",
                            width: "100%",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 16px",
                            fontSize: "14px",
                            color: "#333",
                            opacity: deleting ? 0.6 : 1,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f5f5f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "none")
                          }
                        >
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
                          {deleting ? "Deleting..." : "Delete Post"}
                        </button>
                      </li>
                    </ul>
                  </div>,
                  document.body,
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

      <CommentSection postId={post.id} commentCount={post.commentCount} />
    </div>
  );
}
