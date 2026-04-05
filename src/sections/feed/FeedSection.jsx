"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { apiClient } from "@/lib/utils/ApiClient";
import FeedLoader from "@/components/feed/FeedLoader";
import Navbar from "@/components/feed/Navbar";
import LeftSidebar from "@/components/feed/sidebar/LeftSidebar";
import PostFeed from "@/components/feed/post/PostFeed";
import RightSidebar from "@/components/feed/sidebar/RightSideBar";

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

  const handlePostCreated = (newPost) => setPosts((prev) => [newPost, ...prev]);
  const handlePostDeleted = (postId) =>
    setPosts((prev) => prev.filter((p) => p.id !== postId));

  if (status === "loading" || initialLoading) {
    return <FeedLoader />;
  }

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <Navbar />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <LeftSidebar />
              <PostFeed
                posts={posts}
                loading={loading}
                lastPostRef={lastPostRef}
                onPostCreated={handlePostCreated}
                onPostDeleted={handlePostDeleted}
              />
              <RightSidebar session={session} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
