import { NotFoundException } from '@nestjs/common';
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
    return this.save(advertise);
  }

  public async updateOne(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<UpdateResult> {
    const result: UpdateResult = await this.update(
      { id },
      { ...updateAdvertiseDto },
    );

    if (result.affected < 1) {
      throw new NotFoundException(`advertise with ${id} id not found.`);
    }
    return result;
  }

  public async getOneById(id: string): Promise<Advertise> {
    const advertise: Advertise = await this.findOne(id);
    if (!advertise) {
      throw new NotFoundException(`advertise with '${id} id is not found.`);
    }
    return advertise;
  }

  public getAll(): Promise<Advertise[]> {
    return this.find();
  }

  public async deleteOne(id: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.delete({ id });

    if (result.affected < 1) {
      throw new NotFoundException(`advertise with ${id} id not found.`);
    }
    return result;
  }
}
