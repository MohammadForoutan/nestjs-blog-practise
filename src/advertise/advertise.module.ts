import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiseController } from './advertise.controller';
import { AdvertiseRepository } from './advertise.repository';
import { AdvertiseService } from './advertise.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertiseRepository]), AuthModule],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule {}
