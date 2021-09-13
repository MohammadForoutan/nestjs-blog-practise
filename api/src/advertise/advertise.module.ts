import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiseController } from './controller/advertise.controller';
import { AdvertiseRepository } from './service/advertise.repository';
import { AdvertiseService } from './service/advertise.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertiseRepository])],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule {}
