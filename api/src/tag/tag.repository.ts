import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    // check uniquness of tag name
    const isTagUnique: Tag = await this.findOne({ name });
    if (isTagUnique) {
      throw new BadRequestException(
        `another tag with '${name}' name already exist`,
      );
    }
    // create ,save and return tag
    const tag: Tag = this.create({ name });
    return await this.save(tag);
  }

  public async getAllTags(): Promise<Tag[]> {
    return await this.find();
  }

  public async updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<void> {
    const { name } = updateTagDto;
    const result: UpdateResult = await this.update({ id }, { name });

    if (result.affected < 1) {
      throw new NotFoundException(`tag with '${id} is not found.`);
    }
  }

  public async deleteTag(id: string): Promise<string> {
    const result: DeleteResult = await this.delete({ id });
    if (result.affected < 1) {
      throw new NotFoundException(`tag with '${id} id is not found.`);
    }

    return 'tag deleted';
  }
}
