import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../models/tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository) private tagRepository: TagRepository,
  ) {}

  public createTag(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagRepository.createTag(createTagDto);
  }

  public getAllTags(): Promise<Tag[]> {
    return this.tagRepository.getAllTags();
  }

  public updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return this.tagRepository.updateTag(id, updateTagDto);
  }

  public deleteTag(id: string): Promise<DeleteResult> {
    return this.tagRepository.deleteTag(id);
  }
}
