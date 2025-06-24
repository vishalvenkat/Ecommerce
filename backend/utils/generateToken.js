import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // Generate a JWT token
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expiration time
  });
};

const setTokenInCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the token
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "Strict", // Helps prevent CSRF attacks
  });
};

export { generateToken, setTokenInCookie };
