/**
 * Express middleware to handle 404 Not Found errors.
 *
 * This function is triggered when no route matches the incoming request.
 * It creates a new error object with a message indicating the requested URL was not found,
 * sets the HTTP status code to 404, and passes the error to the next middleware
 * (typically a centralized error handler).
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the chain.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Custom Express error-handling middleware.
 *
 * This function captures any errors passed via `next(err)` in the middleware chain.
 * It ensures the response has an appropriate HTTP status code (defaults to 500 if none was set),
 * and returns a JSON object containing the error message and (optionally) the stack trace.
 *
 * In production (`process.env.NODE_ENV === 'production'`), the stack trace is omitted for security.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the chain.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Check for Mongoose bad object ID error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    err.statusCode = 404;
    err.message = "Resource not found";
  }

  // Send the error response
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
