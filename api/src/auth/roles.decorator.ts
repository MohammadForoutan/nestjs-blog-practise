import { SetMetadata } from '@nestjs/common';
export const hasRoles = (...roles: string[]) => SetMetadata('roles', roles);
