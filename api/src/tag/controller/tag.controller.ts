import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../models/tag.entity';
import { TagService } from '../service/tag.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { hasRoles } from 'src/auth/service/roles.decorator';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  @ApiOkResponse({ description: 'all tags are retrieve.' })
  public getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'tag has been created successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(createTagDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'tag has been updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @ApiParam({ name: 'id' })
  @Patch('/:id')
  public updateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return this.tagService.updateTag(id, updateTagDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'tag has been deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @ApiParam({ name: 'id' })
  @Delete('/:id')
  public deleteTag(@Param('id') id: string): Promise<DeleteResult> {
    return this.tagService.deleteTag(id);
  }
}
