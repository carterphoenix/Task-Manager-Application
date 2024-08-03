import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { _id: string };
}

export interface ErrorWithMessage extends Error {
  message: string;
}
