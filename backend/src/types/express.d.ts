import { Request } from 'express';
import { User } from '../models/user';

// Extend Express.Request with a custom user property
export interface CustomRequest extends Request {
  user?: User;
}
