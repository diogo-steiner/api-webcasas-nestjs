import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

export const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedException('Missing headers authorization');
  }

  const token = authorization.split(' ')[1];

  return jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      throw new UnauthorizedException(err.message);
    }

    req.user = {
      id: String(decoded.sub),
    };

    return next();
  });
};
