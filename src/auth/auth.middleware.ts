import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    console.log({ url: req.url });

    // const user: User = req.user;
    // get user
    // user.canAccessDashboard is true => continue
    // else return 403 error;
    if (req.user && req.user.canAccessDashboard) {
      next();
    } else {
      throw new ForbiddenException('Forbidden 403 !!!');
    }
  }
}
