import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
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
  // create
  public async createAdvertise(
    createAdvertiseDto: CreateAdvertiseDto,
    user: User,
  ): Promise<Advertise> {
    //   check user is admin or not
    // if(user.role !== admin) return
    const { name, description } = createAdvertiseDto;
    const advertise: Advertise = this.create({ name, description });
    return await this.save(advertise);
  }
  // update
  public async updateAdvertise(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
    user: User,
  ): Promise<void> {
    //   check user is admin or not
    // if(user.role !== admin) return
    const { name, description } = updateAdvertiseDto;
    const result: UpdateResult = await this.update(
      { id },
      { name, description },
    );

    if (result.affected) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }
  }
  // get
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
  public async deleteAdvertise(id: string, user: User): Promise<void> {
    // check user is admin or not
    const result: DeleteResult = await this.delete({ id });

    if (result.affected) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }
  }
}
