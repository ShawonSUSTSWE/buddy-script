import withHandler from "@/lib/middleware/withHandler";
import { postService } from "@/services/PostService";

const getPostHandler = async (req) => {
  return postService.getPost({
    id: req.query.id,
    currentUserId: req.user.id,
  });
};

const deletePostHandler = async (req) => {
  return postService.deletePost({
    id: req.query.id,
    userId: req.user.id,
  });
};

export const GET = withHandler(getPostHandler, { requireAuth: true });
export const DELETE = withHandler(deletePostHandler, { requireAuth: true });
