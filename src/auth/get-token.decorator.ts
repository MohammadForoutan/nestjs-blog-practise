import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.headers.authorization) {
      return req.headers.authorization.replace('Bearer ', '');
    }
    return '';
  },
);
