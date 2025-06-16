/*
In Express.js, if an asynchronous route (e.g., one using async/await) throws an error or rejects a promise, the error won’t automatically be caught by Express’s error-handling middleware unless you manually catch it and call next(err).

This asyncHandler function helps you avoid repetitive try/catch blocks in every async route.

Let's unpack it step-by-step:
    1. asyncHandler is a higher-order function:
        It takes a function fn as an argument. This fn is your actual asynchronous route handler.

    2. Returns a new function:
        The returned function has the usual Express middleware signature: (req, res, next).

    3. Promise.resolve(...).catch(next):
        It runs fn(req, res, next) and wraps it in Promise.resolve(...), so if fn returns a rejected promise or throws an error, .catch(next) will catch it and pass the error to the next middleware.

✅ Benefits:
    1. Cleaner code.

    2. Centralized error handling.

    3. Avoids duplicated try/catch logic in every async route.

*/

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
