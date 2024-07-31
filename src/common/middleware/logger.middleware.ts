import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    if (!accessToken) {
      res.redirect('/login', 302);
      return;
    }

    //    const secret = this.configService.getOrThrow('JWT_SECRET');

    //    jwt.verify(accessToken, secret, (err: any, decoded: any) => {
    //      if (err) {
    //        res.status(401).send('Unauthorized');
    //        return;
    //      }
    next();
    //    });
  }
}
