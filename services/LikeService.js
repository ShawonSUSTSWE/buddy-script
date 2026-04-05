import { AppError } from "@/lib/utils/AppError";
import { likeRepository } from "@/repositories/LikeRepository";
import { postRepository } from "@/repositories/PostRepository";
import { commentRepository } from "@/repositories/CommentRepository";
import prisma from "@/lib/config/prisma";

export const likeService = {
  async togglePostLike({ postId, userId }) {
    const post = await postRepository.existsAndAccessible({
      id: postId,
      currentUserId: userId,
    });
    if (!post) throw new AppError("Post not found", 404);

    const existing = await likeRepository.findPostLike({ userId, postId });
    if (existing) {
      await likeRepository.deleteLike(existing.id);
      const likeCount = await likeRepository.countPostLikes(postId);
      return { data: { liked: false, likeCount } };
    }

    await likeRepository.createPostLike({ userId, postId });
    const likeCount = await likeRepository.countPostLikes(postId);
    return { data: { liked: true, likeCount } };
  },

  async toggleCommentLike({ commentId, userId }) {
    const comment = await commentRepository.exists(commentId);
    if (!comment) throw new AppError("Comment not found", 404);

    const existing = await likeRepository.findCommentLike({
      userId,
      commentId,
    });
    if (existing) {
      await likeRepository.deleteLike(existing.id);
      const likeCount = await likeRepository.countCommentLikes(commentId);
      return { data: { liked: false, likeCount } };
    }

    await likeRepository.createCommentLike({ userId, commentId });
    const likeCount = await likeRepository.countCommentLikes(commentId);
    return { data: { liked: true, likeCount } };
  },

  async toggleReplyLike({ replyId, userId }) {
    const reply = await prisma.reply.findFirst({
      where: { id: replyId, deletedAt: null },
      select: { id: true },
    });
    if (!reply) throw new AppError("Reply not found", 404);

    const existing = await likeRepository.findReplyLike({ userId, replyId });
    if (existing) {
      await likeRepository.deleteLike(existing.id);
      const likeCount = await likeRepository.countReplyLikes(replyId);
      return { data: { liked: false, likeCount } };
    }

    await likeRepository.createReplyLike({ userId, replyId });
    const likeCount = await likeRepository.countReplyLikes(replyId);
    return { data: { liked: true, likeCount } };
  },

  async getPostLikers(postId) {
    const likes = await likeRepository.getLikers({ postId });
    return {
      data: { likes: likes.map((l) => ({ ...l.user, likedAt: l.createdAt })) },
    };
  },

  async getCommentLikers(commentId) {
    const likes = await likeRepository.getLikers({ commentId });
    return {
      data: { likes: likes.map((l) => ({ ...l.user, likedAt: l.createdAt })) },
    };
  },

  async getReplyLikers(replyId) {
    const likes = await likeRepository.getLikers({ replyId });
    return {
      data: { likes: likes.map((l) => ({ ...l.user, likedAt: l.createdAt })) },
    };
  },
};
