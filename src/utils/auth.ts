import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { findUserWithFilters } from "../users/module";
const JWT_SECRET = process.env.JWT_SECRET || "dummy_secret";

export async function encodeJWT(payload: Object) {
  const token = jwt.sign(payload, JWT_SECRET);
  return `Bearer ${token}`;
}

export async function decodeJWT(token: string) {
  const payload = jwt.decode(token);
  return payload;
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token && typeof token === "string") {
    const reqUser: any = await decodeJWT(token);
    const user = await findUserWithFilters({id: reqUser.id});
    if (user) {
      (req as any).user = user;
    } else {
      next(new Error("User not found"));
    }
  }
  next();
}

export async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as any).user;
  if (user) {
    next();
  } else {
    next(new Error("User not authorized to access this section"));
  }
}
