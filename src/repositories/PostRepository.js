import prisma from "@/lib/config/prisma";

export const postRepository = {
  async findMany({ cursor, limit, currentUserId }) {
    return prisma.post.findMany({
      where: {
        deletedAt: null,
        OR: [{ isPrivate: false }, { authorId: currentUserId }],
      },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        isPrivate: true,
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
          select: { likes: true, comments: { where: { deletedAt: null } } },
        },
        comments: {
          where: { deletedAt: null },
          select: {
            _count: {
              select: { replies: true },
            },
          },
        },
        likes: {
          where: { userId: currentUserId },
          select: { id: true },
          take: 1,
        },
      },
    });
  },

  async findById({ id, currentUserId }) {
    return prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
        OR: [{ isPrivate: false }, { authorId: currentUserId }],
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        isPrivate: true,
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
          select: { likes: true, comments: { where: { deletedAt: null } } },
        },
        comments: {
          where: { deletedAt: null },
          select: {
            _count: {
              select: { replies: true },
            },
          },
        },
        likes: {
          where: { userId: currentUserId },
          select: { id: true },
          take: 1,
        },
      },
    });
  },

  async findOwner(id) {
    return prisma.post.findUnique({
      where: { id },
      select: { authorId: true, deletedAt: true },
    });
  },

  async create({ content, imageUrl, isPrivate, authorId }) {
    return prisma.post.create({
      data: { content, imageUrl, isPrivate, authorId },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        isPrivate: true,
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

  async softDelete(id) {
    return prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async existsAndAccessible({ id, currentUserId }) {
    return prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
        OR: [{ isPrivate: false }, { authorId: currentUserId }],
      },
      select: { id: true },
    });
  },
};
