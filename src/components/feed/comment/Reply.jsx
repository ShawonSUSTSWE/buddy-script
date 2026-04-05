import { timeAgo } from "@/lib/utils/UserUtils";
import LikeButton from "../like/LikeButton";

export default function Reply({ reply }) {
  return (
    <div className="_comment_main _reply_comment">
      <div className="_comment_image">
        <img
          src={reply.author.avatarUrl || "/assets/images/profile.png"}
          alt=""
          className="_comment_img1"
        />
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <h4 className="_comment_name_title">
                {reply.author.firstName} {reply.author.lastName}
              </h4>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{reply.content}</span>
            </p>
          </div>

          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <LikeButton
                    entityType="reply"
                    entityId={reply.id}
                    initialLiked={reply.userLiked}
                    initialCount={reply.likeCount}
                  />
                </li>
                <li>
                  <span className="_time_link">{timeAgo(reply.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
