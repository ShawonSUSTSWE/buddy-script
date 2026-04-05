import prisma from "@/lib/config/prisma";

export const replyRepository = {
  async findByComment({ commentId, cursor, limit, currentUserId }) {
    return prisma.reply.findMany({
      where: { commentId, deletedAt: null },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        _count: { select: { likes: true } },
        likes: {
          where: { userId: currentUserId },
          select: { id: true },
          take: 1,
        },
      },
    });
  },

  async create({ content, commentId, authorId }) {
    return prisma.reply.create({
      data: { content, commentId, authorId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });
  },
};
