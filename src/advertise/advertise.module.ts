import { Module } from '@nestjs/common';
import { AdvertiseController } from './advertise.controller';
import { AdvertiseService } from './advertise.service';

@Module({
  controllers: [AdvertiseController],
  providers: [AdvertiseService]
})
export class AdvertiseModule {}
