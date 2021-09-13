import { NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Advertise } from './advertise.entity';
import { CreateAdvertiseDto } from './dto/create-advertise.dto';
import { UpdateAdvertiseDto } from './dto/update-advertise.dto';

@EntityRepository(Advertise)
export class AdvertiseRepository extends Repository<Advertise> {
  public createOne(
    createAdvertiseDto: CreateAdvertiseDto,
    user: User,
  ): Promise<Advertise> {
    const { name, description, media } = createAdvertiseDto;
    const advertise: Advertise = this.create({
      name,
      description,
      media,
      user,
    });
    return this.save(advertise);
  }

  public async updateOne(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<Advertise> {
    const { name, description, media } = updateAdvertiseDto;
    const advertise: Advertise = await this.getOneById(id);
    return this.save({ ...advertise, name, description, media });
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
    const advertise: Advertise = await this.getOneById(id);
    const result: DeleteResult = await this.delete({ id: advertise.id });
    return result;
  }
}
