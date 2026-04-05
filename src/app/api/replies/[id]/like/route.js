import withHandler from "@/lib/middleware/withHandler";
import { likeService } from "@/services/LikeService";

const toggleLikeHandler = async (req) => {
  return likeService.toggleReplyLike({
    replyId: req.query.id,
    userId: req.user.id,
  });
};

const getLikersHandler = async (req) => {
  return likeService.getReplyLikers(req.query.id);
};

export const POST = withHandler(toggleLikeHandler, { requireAuth: true });
export const GET = withHandler(getLikersHandler, { requireAuth: true });
