import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

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
    updateTagDto: UpdateTagDto,
    @GetUser() user: User,
  ): void {
    this.tagService.updateTag(id, updateTagDto, user);
  }

  @Delete('/:id')
  public deleteTag(@Param('id') id: string, @GetUser() user: User): void {
    this.tagService.deleteTag(id, user);
  }
}
