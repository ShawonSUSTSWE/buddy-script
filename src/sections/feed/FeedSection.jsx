"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/feed/Navbar";
import CreatePostForm from "@/components/feed/post/CreatePostForm";
import PostCard from "@/components/feed/post/PostCard";
import { apiClient } from "@/lib/utils/ApiClient";

export default function FeedSection() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchPosts = useCallback(async (cursorId = null) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const { posts, nextCursor } = await apiClient(
        `/api/posts?limit=20${cursorId ? `&cursor=${cursorId}` : ""}`,
      );

      setPosts((prev) => (cursorId ? [...prev, ...posts] : posts));
      setCursor(nextCursor);
      setHasMore(!!nextCursor);
    } catch {
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && cursor) {
          fetchPosts(cursor);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, cursor, fetchPosts],
  );

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  if (status === "loading" || initialLoading) {
    return (
      <div className="_layout _layout_main_wrapper">
        <div className="_main_layout">
          <Navbar />
          <div
            className="container _custom_container"
            style={{ paddingTop: "40px" }}
          >
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-12">
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid #e0e0e0",
                      borderTop: "3px solid #377DFF",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p style={{ marginTop: "16px", color: "#999" }}>
                    Loading feed...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <Navbar />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_left_sidebar_wrap">
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <h4 className="_left_inner_area_explore_title _title5 _mar_b24">
                        Explore
                      </h4>
                      <ul className="_left_inner_area_explore_list">
                        <li className="_left_inner_area_explore_item">
                          <a href="#" className="_left_inner_area_explore_link">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill="#666"
                                d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14z"
                              />
                            </svg>
                            Learning
                          </a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="#" className="_left_inner_area_explore_link">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#666"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Community
                          </a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="#" className="_left_inner_area_explore_link">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 24"
                              fill="none"
                              stroke="#666"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                              <polyline points="17 21 17 13 7 13 7 21" />
                              <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Bookmarks
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Content */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <CreatePostForm onPostCreated={handlePostCreated} />

                    {posts?.length === 0 && !loading && (
                      <div
                        className="_b_radious6 _feed_inner_area"
                        style={{ textAlign: "center", padding: "48px 24px" }}
                      >
                        <p style={{ color: "#999", fontSize: "15px" }}>
                          No posts yet. Be the first to share something!
                        </p>
                      </div>
                    )}

                    {posts?.map((post, index) => (
                      <div
                        key={post.id}
                        ref={index === posts?.length - 1 ? lastPostRef : null}
                      >
                        <PostCard post={post} onDelete={handlePostDeleted} />
                      </div>
                    ))}

                    {loading && posts?.length > 0 && (
                      <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "3px solid #e0e0e0",
                            borderTop: "3px solid #377DFF",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  <div className="_layout_right_sidebar_inner">
                    <div className="_right_inner_area _b_radious6 _padd_t24 _padd_b24 _padd_r24 _padd_l24 _feed_inner_area">
                      <div
                        className="_right_inner_area_content"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={
                            session?.user?.avatarUrl ||
                            "/assets/images/profile.png"
                          }
                          alt=""
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "12px",
                          }}
                        />
                        <h5
                          style={{
                            fontWeight: 600,
                            fontSize: "15px",
                            marginBottom: "4px",
                          }}
                        >
                          {session?.user?.firstName} {session?.user?.lastName}
                        </h5>
                        <p style={{ fontSize: "13px", color: "#999" }}>
                          {session?.user?.email}
                        </p>
                        <button
                          onClick={() => signOut({ callbackUrl: "/login" })}
                          style={{
                            marginTop: "16px",
                            padding: "8px 16px",
                            background: "none",
                            border: "1px solid #e0e0e0",
                            borderRadius: "6px",
                            color: "#ff6b6b",
                            fontSize: "13px",
                            fontWeight: "500",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background 0.2s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background = "#fff0f0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "none")
                          }
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
