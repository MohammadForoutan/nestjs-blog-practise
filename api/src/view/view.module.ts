import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewController } from './view.controller';
import { ViewRepotitory } from './view.repository';
import { ViewService } from './view.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViewRepotitory])],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
