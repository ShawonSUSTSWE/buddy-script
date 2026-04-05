import prisma from "@/lib/config/prisma";

export const commentRepository = {
  async findByPost({ postId, cursor, limit, currentUserId }) {
    return prisma.comment.findMany({
      where: { postId, deletedAt: null },
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
        _count: {
          select: { likes: true, replies: { where: { deletedAt: null } } },
        },
        likes: {
          where: { userId: currentUserId },
          select: { id: true },
          take: 1,
        },
      },
    });
  },

  async create({ content, postId, authorId }) {
    return prisma.comment.create({
      data: { content, postId, authorId },
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

  async exists(id) {
    return prisma.comment.findFirst({
      where: { id, deletedAt: null },
      select: { id: true },
    });
  },
};
