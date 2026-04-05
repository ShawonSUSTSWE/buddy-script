import { apiClient } from "@/lib/utils/ApiClient";
import { timeAgo } from "@/lib/utils/UserUtils";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import LikeButton from "../like/LikeButton";
import Reply from "./Reply";

export default function Comment({ comment }) {
  const { data: session } = useSession();
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
    <div className="_comment_main">
      <div className="_comment_image">
        <img
          src={comment.author.avatarUrl || "/assets/images/profile.png"}
          alt=""
          className="_comment_img1"
        />
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <h4 className="_comment_name_title">
                {comment.author.firstName} {comment.author.lastName}
              </h4>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.content}</span>
            </p>
          </div>

          {/* Action bar positioned absolutely below the bubble */}
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <LikeButton
                    entityType="comment"
                    entityId={comment.id}
                    initialLiked={comment.userLiked}
                    initialCount={comment.likeCount}
                  />
                </li>
                <li>
                  <span onClick={() => setShowReplyInput(!showReplyInput)}>
                    Reply
                  </span>
                </li>
                <li>
                  <span className="_time_link">
                    {timeAgo(comment.createdAt)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* View replies */}
        {replyCount > 0 && !showReplies && (
          <div className="_previous_comment">
            <button
              type="button"
              className="_previous_comment_txt"
              onClick={loadReplies}
              disabled={loadingReplies}
            >
              {loadingReplies
                ? "Loading..."
                : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
            </button>
          </div>
        )}

        {/* Replies list */}
        {showReplies &&
          replies.map((reply) => <Reply key={reply.id} reply={reply} />)}

        {showReplies && replyCursor && (
          <div className="_previous_comment">
            <button
              type="button"
              className="_previous_comment_txt"
              onClick={loadReplies}
              disabled={loadingReplies}
            >
              {loadingReplies ? "Loading..." : "Load more replies"}
            </button>
          </div>
        )}

        {/* Reply input box */}
        {showReplyInput && (
          <div className="_feed_inner_comment_box" style={{ marginTop: "8px" }}>
            <form
              className="_feed_inner_comment_box_form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="_feed_inner_comment_box_content">
                <div className="_feed_inner_comment_box_content_image">
                  <img
                    src={
                      session?.user?.avatarUrl || "/assets/images/profile.png"
                    }
                    alt=""
                    className="_comment_img"
                  />
                </div>
                <div className="_feed_inner_comment_box_content_txt">
                  <textarea
                    className="form-control _comment_textarea"
                    placeholder="Write a reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitReply();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="_feed_inner_comment_box_icon">
                <button
                  type="button"
                  className="_feed_inner_comment_box_icon_btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#000"
                      fillOpacity=".46"
                      fillRule="evenodd"
                      d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="_feed_inner_comment_box_icon_btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#000"
                      fillOpacity=".46"
                      fillRule="evenodd"
                      d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
