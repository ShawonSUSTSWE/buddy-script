import { getToken } from "next-auth/jwt";

export const getUserFromRequest = async (req) => {
  try {
    const token = await getToken({ req: req.raw ?? req });
    return token ?? null;
  } catch {
    return null;
  }
};
