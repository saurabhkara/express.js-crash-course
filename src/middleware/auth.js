import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      return next(); //calling without argument,Will call next middleware or handler
    } catch (error) {
      return next(error); // Error handler middleware
    }
  }
  const error = new Error("Not authenticated");
  error.statusCode = 401;
  return next(error);
}
