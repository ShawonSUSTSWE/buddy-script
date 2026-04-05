import { AppError } from "@/lib/middleware/AppError";
import { createCommentSchema } from "@/lib/helpers/validations";
import { commentRepository } from "@/repositories/CommentRepository";
import { postRepository } from "@/repositories/PostRepository";

const transformComment = (c) => ({
  id: c.id,
  content: c.content,
  createdAt: c.createdAt,
  author: c.author,
  likeCount: c._count.likes,
  replyCount: c._count.replies,
  userLiked: c.likes.length > 0,
});

export const commentService = {
  async getComments({ postId, cursor, limit, currentUserId }) {
    const post = await postRepository.existsAndAccessible({
      id: postId,
      currentUserId,
    });
    if (!post) throw new AppError("Post not found", 404);

    const comments = await commentRepository.findByPost({
      postId,
      cursor,
      limit,
      currentUserId,
    });

    let nextCursor = null;
    if (comments.length > limit) {
      const nextItem = comments.pop();
      nextCursor = nextItem.id;
    }

    return { data: { comments: comments.map(transformComment), nextCursor } };
  },

  async createComment({ postId, body, userId }) {
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      throw new AppError(validation.error.errors[0].message, 400);
    }

    const post = await postRepository.existsAndAccessible({
      id: postId,
      currentUserId: userId,
    });
    if (!post) throw new AppError("Post not found", 404);

    const comment = await commentRepository.create({
      content: validation.data.content,
      postId,
      authorId: userId,
    });

    return {
      data: { ...comment, likeCount: 0, replyCount: 0, userLiked: false },
      statusCode: 201,
    };
  },
};
