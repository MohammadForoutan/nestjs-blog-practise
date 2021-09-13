import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './controller/tag.controller';
import { TagRepository } from './service/tag.repository';
import { TagService } from './service/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
