import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload & { _id: string };
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  userId: string;
  status: string;
}
