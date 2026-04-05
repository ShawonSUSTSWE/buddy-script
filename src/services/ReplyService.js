import { AppError } from "@/lib/utils/AppError";
import { createReplySchema } from "@/lib/helpers/validations";
import { replyRepository } from "@/repositories/ReplyRepository";
import { commentRepository } from "@/repositories/CommentRepository";

const transformReply = (r) => ({
  id: r.id,
  content: r.content,
  createdAt: r.createdAt,
  author: r.author,
  likeCount: r._count.likes,
  userLiked: r.likes.length > 0,
});

export const replyService = {
  async getReplies({ commentId, cursor, limit, currentUserId }) {
    const comment = await commentRepository.exists(commentId);
    if (!comment) throw new AppError("Comment not found", 404);

    const replies = await replyRepository.findByComment({
      commentId,
      cursor,
      limit,
      currentUserId,
    });

    let nextCursor = null;
    if (replies.length > limit) {
      const nextItem = replies.pop();
      nextCursor = nextItem.id;
    }

    return { data: { replies: replies.map(transformReply), nextCursor } };
  },

  async createReply({ commentId, body, userId }) {
    const validation = createReplySchema.safeParse(body);
    if (!validation.success) {
      throw new AppError(validation.error.errors[0].message, 400);
    }

    const comment = await commentRepository.exists(commentId);
    if (!comment) throw new AppError("Comment not found", 404);

    const reply = await replyRepository.create({
      content: validation.data.content,
      commentId,
      authorId: userId,
    });

    return {
      data: { ...reply, likeCount: 0, userLiked: false },
      statusCode: 201,
    };
  },
};
