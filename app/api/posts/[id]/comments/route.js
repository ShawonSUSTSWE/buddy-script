import withHandler from "@/lib/middleware/withHandler";
import { commentService } from "@/services/CommentService";

const getCommentsHandler = async (req) => {
  return commentService.getComments({
    postId: req.query.id,
    cursor: req.query.cursor,
    limit: parseInt(req.query.limit || "10"),
    currentUserId: req.user.id,
  });
};

const createCommentHandler = async (req) => {
  return commentService.createComment({
    postId: req.query.id,
    body: req.body,
    userId: req.user.id,
  });
};

export const GET = withHandler(getCommentsHandler, { requireAuth: true });
export const POST = withHandler(createCommentHandler, { requireAuth: true });
