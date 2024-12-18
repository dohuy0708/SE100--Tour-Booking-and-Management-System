import jwt from 'jsonwebtoken';
import { ErrorCode } from '../enum/error-code-enum';
import BaseError from '../utils/base-error';

export async function authenticateJWT(req: any, res: any, next: any) {
  try {
    //Log all header
    console.log('request header:', req.headers);

    let token: string = req.header('Authorization');
    if (!token) {
      throw new BaseError(ErrorCode.AUTH_01, 'Authorization header is required');
    }
    if (token != null) {
      token = token.split('Bearer ')[1];
    }
    const secretKey = process.env.LOGIN_SECRET || '';
    jwt.verify(token, secretKey, async (err: any, user: any) => {
      if (err) {
        return next(new BaseError(ErrorCode.AUTH_02, 'Invalid token. You need to login first'));
      }
      console.log('Logged in as:', user);
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}
