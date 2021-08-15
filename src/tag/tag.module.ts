import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository]), AuthModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
