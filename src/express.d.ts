import { UserRole } from "./roles";

declare module "express-server-static-core" {
  interface Request {
    user?: {
      id: string;
      role: UserRole;
    };
  }
}