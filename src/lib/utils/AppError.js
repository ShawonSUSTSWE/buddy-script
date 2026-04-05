export class AppError extends Error {
  constructor(message, statusCode = 500, result = null) {
    super(message);
    this.statusCode = statusCode;
    this.result = result;
  }
}
