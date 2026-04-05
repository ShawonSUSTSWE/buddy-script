import prisma from "@/lib/config/prisma";

export const likeRepository = {
  async findPostLike({ userId, postId }) {
    return prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
      select: { id: true },
    });
  },
  async createPostLike({ userId, postId }) {
    return prisma.like.create({ data: { userId, postId } });
  },
  async countPostLikes(postId) {
    return prisma.like.count({ where: { postId } });
  },

  async findCommentLike({ userId, commentId }) {
    return prisma.like.findUnique({
      where: { userId_commentId: { userId, commentId } },
      select: { id: true },
    });
  },
  async createCommentLike({ userId, commentId }) {
    return prisma.like.create({ data: { userId, commentId } });
  },
  async countCommentLikes(commentId) {
    return prisma.like.count({ where: { commentId } });
  },

  async findReplyLike({ userId, replyId }) {
    return prisma.like.findUnique({
      where: { userId_replyId: { userId, replyId } },
      select: { id: true },
    });
  },
  async createReplyLike({ userId, replyId }) {
    return prisma.like.create({ data: { userId, replyId } });
  },
  async countReplyLikes(replyId) {
    return prisma.like.count({ where: { replyId } });
  },

  async deleteLike(id) {
    return prisma.like.delete({ where: { id } });
  },

  async getLikers({ postId, commentId, replyId }) {
    const where = {};
    if (postId) where.postId = postId;
    if (commentId) where.commentId = commentId;
    if (replyId) where.replyId = replyId;

    return prisma.like.findMany({
      where,
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  },
};
