import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { AdvertiseController } from './advertise.controller';
import { AdvertiseRepository } from './advertise.repository';
import { AdvertiseService } from './advertise.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertiseRepository]), AuthModule],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'advertise', method: RequestMethod.POST },
        { path: 'advertise', method: RequestMethod.PUT },
        { path: 'advertise', method: RequestMethod.DELETE },
      );
  }
}
