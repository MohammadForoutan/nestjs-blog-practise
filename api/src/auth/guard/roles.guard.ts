import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    // if user not logged in
    if (!user) {
      throw new UnauthorizedException('please login first');
    }

    // check permission with role
    const hasRole = roles.indexOf(user.role) > -1;
    let hasPermission = false;
    if (hasRole) {
      hasPermission = true;
    }
    return hasPermission;
  }
}
