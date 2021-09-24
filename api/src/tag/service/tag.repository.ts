import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../models/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    try {
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
      return this.save(tag);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getAllTags(): Promise<Tag[]> {
    return this.find();
  }

  public async updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    try {
      const { name } = updateTagDto;
      const result: UpdateResult = await this.update({ id }, { name });

      if (result.affected < 1) {
        throw new NotFoundException(`tag with '${id} is not found.`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteTag(id: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.delete({ id });
      if (result.affected < 1) {
        throw new NotFoundException(`tag with '${id} id is not found.`);
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
