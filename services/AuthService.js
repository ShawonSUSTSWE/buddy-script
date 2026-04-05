import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/helpers/validations";
import { userRepository } from "@/repositories/UserRepository";
import { AppError } from "@/lib/utils/AppError";
import { getRandomAvatarUrl } from "@/lib/utils/UserUtils";

export const authService = {
  async register(body) {
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      throw new AppError(validation.error.errors[0].message, 400);
    }

    const { firstName, lastName, email, password } = validation.data;

    const existing = await userRepository.findByEmailExists(email);
    if (existing) {
      throw new AppError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
      avatarUrl: getRandomAvatarUrl(),
    });

    return {
      data: { message: "Account created successfully", user },
      statusCode: 201,
    };
  },
};
