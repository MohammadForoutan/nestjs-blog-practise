import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiseController } from './advertise.controller';
import { AdvertiseRepository } from './advertise.repository';
import { AdvertiseService } from './advertise.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertiseRepository])],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule {}
