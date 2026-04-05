import { NextResponse } from "next/server";

export const createSuccessResponse = (
  result,
  message = "OK",
  statusCode = 200,
) => {
  return NextResponse.json(
    {
      type: "RESULT",
      message,
      result,
      error: null,
      code: statusCode,
    },
    { status: statusCode },
  );
};

export const createErrorResponse = (error, statusCode = 500) => {
  return NextResponse.json(
    {
      type: "ERROR",
      message: error.message || "An unexpected error occurred",
      result: error.result ?? null,
      error:
        process.env.NODE_ENV === "production" ? null : (error.stack ?? null),
      code: statusCode,
    },
    { status: statusCode },
  );
};
