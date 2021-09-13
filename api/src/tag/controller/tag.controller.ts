import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../models/tag.entity';
import { TagService } from '../service/tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  public getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @Get('/post/:postId')
  public getPostTags() {
    // ...
    // get post's tags
  }

  @Post()
  public createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(createTagDto);
  }

  @Patch('/:id')
  public updateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): void {
    this.tagService.updateTag(id, updateTagDto);
  }

  @Delete('/:id')
  public deleteTag(@Param('id') id: string): Promise<string> {
    return this.tagService.deleteTag(id);
  }
}
