import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string; // Ensure this matches the token secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const generateAccessToken = (user: any) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

router.post('/refresh-token', async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
    const user = { id: decoded.id };
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403); // Forbidden
  }
});

export default router;
