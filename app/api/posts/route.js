import withHandler from "@/lib/middleware/withHandler";
import { postService } from "@/services/PostService";

const getPostsHandler = async (req) => {
  return postService.getFeed({
    cursor: req.query.cursor,
    limit: parseInt(req.query.limit || "20"),
    currentUserId: req.user.id,
  });
};

const createPostHandler = async (req) => {
  return postService.createPost({
    body: req.body,
    userId: req.user.id,
  });
};

export const GET = withHandler(getPostsHandler, { requireAuth: true });
export const POST = withHandler(createPostHandler, { requireAuth: true });
