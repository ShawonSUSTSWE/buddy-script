import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import StoriesDesktop from "../stories/StoriesDesktop";
import StoriesMobile from "../stories/StoriesMobile";

export default function PostFeed({
  posts,
  loading,
  lastPostRef,
  onPostCreated,
  onPostDeleted,
}) {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div className="_layout_middle_wrap">
        <div className="_layout_middle_inner">
          <StoriesDesktop />
          <StoriesMobile />
          <CreatePostForm onPostCreated={onPostCreated} />

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
              ref={index === posts.length - 1 ? lastPostRef : null}
            >
              <PostCard post={post} onDelete={onPostDeleted} />
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
  );
}
