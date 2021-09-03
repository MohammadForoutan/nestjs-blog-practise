import { NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Advertise } from './advertise.entity';
import { CreateAdvertiseDto } from './dto/create-advertise.dto';
import { UpdateAdvertiseDto } from './dto/update-advertise.dto';

@EntityRepository(Advertise)
export class AdvertiseRepository extends Repository<Advertise> {
  public async createAdvertise(
    createAdvertiseDto: CreateAdvertiseDto,
    user: User,
  ): Promise<Advertise> {
    const { name, description } = createAdvertiseDto;
    const advertise: Advertise = this.create({ name, description, user });
    return await this.save(advertise);
  }
  // update
  public async updateAdvertise(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<void> {
    const { name, description, media } = updateAdvertiseDto;
    const result: UpdateResult = await this.update(
      { id },
      { name, description, media },
    );

    if (result.affected) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }
  }

  public async getAdvtise(id: string): Promise<Advertise> {
    const advertise: Advertise = await this.findOne({ id });
    if (!advertise) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }

    return advertise;
  }

  public async getAllAdvertises(): Promise<Advertise[]> {
    return await this.find();
  }
  // delete
  public async deleteAdvertise(id: string): Promise<void> {
    const result: DeleteResult = await this.delete({ id });

    if (result.affected) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }
  }
}
