import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AdvertiseController } from './advertise.controller';
import { AdvertiseRepository } from './advertise.repository';
import { AdvertiseService } from './advertise.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([AdvertiseRepository]),
  ],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule {}
