import { NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Advertise } from './advertise.entity';
import { CreateAdvertiseDto } from './dto/create-advertise.dto';
import { UpdateAdvertiseDto } from './dto/update-advertise.dto';

@EntityRepository(Advertise)
export class AdvertiseRepository extends Repository<Advertise> {
  public createAdvertise(
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

  public async updateAdvertise(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<Advertise> {
    const { name, description, media } = updateAdvertiseDto;
    const advertise: Advertise = await this.getAdvtise(id);
    return this.save({ ...advertise, name, description, media });
  }

  public async getAdvtise(id: string): Promise<Advertise> {
    const advertise: Advertise = await this.findOne(id);
    if (!advertise) {
      throw new NotFoundException(`advertise with '${id} is not found.`);
    }
    return advertise;
  }

  public getAllAdvertises(): Promise<Advertise[]> {
    return this.find();
  }

  public async deleteAdvertise(id: string): Promise<{ message: string }> {
    const advertise: Advertise = await this.getAdvtise(id);
    this.delete({ id: advertise.id });
    return {
      message: `advertise with name ${advertise.name} deleted successfully`,
    };
  }
}
