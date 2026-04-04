import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations";
import { userRepository } from "@/repositories/UserRepository";

export const authService = {
  async register(body) {
    try {
      const validation = registerSchema.safeParse(body);
      if (!validation.success) {
        return { error: validation.error.errors[0].message, status: 400 };
      }

      const { firstName, lastName, email, password } = validation.data;

      const existing = await userRepository.findByEmailExists(email);
      if (existing) {
        return {
          error: "An account with this email already exists",
          status: 409,
        };
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await userRepository.create({
        firstName,
        lastName,
        email,
        passwordHash,
      });

      return {
        data: { message: "Account created successfully", user },
        status: 201,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return { error: "An unexpected error occurred", status: 500 };
    }
  },
};
