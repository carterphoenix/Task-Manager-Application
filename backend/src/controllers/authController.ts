import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const refreshToken = (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

    // Generate a new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token', error: (error as any).message });
  }
};
