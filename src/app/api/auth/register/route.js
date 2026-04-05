import withHandler from "@/lib/middleware/withHandler";
import { authService } from "@/services/AuthService";

const registerHandler = async (req) => {
  return authService.register(req.body);
};

export const POST = withHandler(registerHandler, { requireAuth: false });
