import { adaptRequest } from "./requestAdapter";
import { getUserFromRequest } from "./auth";
import { createSuccessResponse, createErrorResponse } from "./responseHandler";

const withHandler = (handler, options = {}) => {
  const { requireAuth = true, allowedMethods = null } = options;

  return async (req, context) => {
    try {
      if (allowedMethods && !allowedMethods.includes(req.method)) {
        return createErrorResponse(
          { message: `Method ${req.method} not allowed` },
          405,
        );
      }

      const adaptedReq = await adaptRequest(req, context);

      console.log(`++ ${adaptedReq.method} ${adaptedReq.originalUrl}`);
      console.log("Body:", adaptedReq.body);
      console.log("Query:", adaptedReq.query);

      if (requireAuth) {
        const user = await getUserFromRequest(req);
        if (!user) {
          return createErrorResponse({ message: "Unauthorized" }, 401);
        }
        adaptedReq.user = user;
      }

      const result = await handler(adaptedReq, context);

      if (result instanceof Response) {
        return result;
      }

      return createSuccessResponse(
        result?.data ?? result,
        result?.message ?? "OK",
        result?.statusCode ?? 200,
      );
    } catch (error) {
      console.error(`Route error:`, error);
      const statusCode = error.statusCode ?? 500;
      return createErrorResponse(error, statusCode);
    }
  };
};

export default withHandler;
