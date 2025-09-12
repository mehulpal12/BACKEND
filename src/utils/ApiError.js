class ApiError extends Error {
  constructor(message = "something went wrong", statusCode = 500, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.stack = stack;
    this.data = null;
    this.message = message;
    this.success = false;
    if (stack) {
      this.stack = stack;
    }else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
