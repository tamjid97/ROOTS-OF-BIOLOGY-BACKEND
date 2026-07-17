import { NextFunction, Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string | null; 
        role: Role;
      };
    }
  }
}
export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        const error: any = new Error("You are not logged in");
        error.statusCode = 401;
        throw error;
      }
      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret as string
      );

      if (!verifiedToken.success) {
        const error: any = new Error("Invalid or expired token");
        error.statusCode = 401;
        throw error;
      }

      const payload = verifiedToken.data as JwtPayload;
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      console.log("JWT Payload:", payload);
      console.log("DB User:", user);
      console.log("Required Roles:", requiredRoles);
      console.log("User Role:", user?.role);

      if (!user) {
        const error: any = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      if (user.status === "BANNED") { 
        const error: any = new Error("Your account is blocked");
        error.statusCode = 403;
        throw error;
      }

      if (
        requiredRoles.length &&
        !requiredRoles.includes(user.role as Role)
      ) {
        const error: any = new Error(
          "Forbidden. You don't have permission to access this resource."
        );
        error.statusCode = 403;
        throw error;
      }
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
      };

      next();
    }
  );
};