import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../user/models/user.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Advertise } from '../models/advertise.entity';
import { CreateAdvertiseDto } from '../dto/create-advertise.dto';
import { UpdateAdvertiseDto } from '../dto/update-advertise.dto';

@EntityRepository(Advertise)
export class AdvertiseRepository extends Repository<Advertise> {
  public createOne(
    createAdvertiseDto: CreateAdvertiseDto,
    user: User,
  ): Promise<Advertise> {
    const advertise: Advertise = this.create({ ...createAdvertiseDto, user });
    return this.save(advertise).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async updateOne(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<UpdateResult> {
    try {
      const result: UpdateResult = await this.update(
        { id },
        { ...updateAdvertiseDto },
      );

      if (result.affected < 1) {
        throw new NotFoundException(`advertise with ${id} id not found.`);
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getOneById(id: string): Promise<Advertise> {
    try {
      const advertise: Advertise = await this.findOne(id);
      if (!advertise) {
        throw new NotFoundException(`advertise with '${id} id is not found.`);
      }
      return advertise;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public getAll(): Promise<Advertise[]> {
    return this.find().catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async deleteOne(id: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.delete({ id });

      if (result.affected < 1) {
        throw new NotFoundException(`advertise with ${id} id not found.`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
