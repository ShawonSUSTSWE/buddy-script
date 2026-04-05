import withHandler from "@/lib/middleware/withHandler";
import { replyService } from "@/services/ReplyService";

const getRepliesHandler = async (req) => {
  return replyService.getReplies({
    commentId: req.query.id,
    cursor: req.query.cursor,
    limit: parseInt(req.query.limit || "10"),
    currentUserId: req.user.id,
  });
};

const createReplyHandler = async (req) => {
  return replyService.createReply({
    commentId: req.query.id,
    body: req.body,
    userId: req.user.id,
  });
};

export const GET = withHandler(getRepliesHandler, { requireAuth: true });
export const POST = withHandler(createReplyHandler, { requireAuth: true });
