import prisma from "@/lib/prisma";

export const userRepository = {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        passwordHash: true,
        avatarUrl: true,
      },
    });
  },

  async findByEmailExists(email) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },

  async create({ firstName, lastName, email, passwordHash }) {
    return prisma.user.create({
      data: { firstName, lastName, email, passwordHash },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
  },
};
