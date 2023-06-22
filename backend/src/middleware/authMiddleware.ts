import jwt from "jsonwebtoken";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";

interface JwtPayload {
  id: string
}

const protect = expressAsyncHandler(async (req: any, res: any, next: any) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      req.user = await User.findById(decoded.id).select(
        "-password"
      ); //no password

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    console.log("no token, not authorized");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
