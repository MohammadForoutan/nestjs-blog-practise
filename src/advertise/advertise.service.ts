import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Advertise } from './advertise.entity';
import { AdvertiseRepository } from './advertise.repository';
import { CreateAdvertiseDto } from './dto/create-advertise.dto';
import { UpdateAdvertiseDto } from './dto/update-advertise.dto';

@Injectable()
export class AdvertiseService {
  constructor(
    @InjectRepository(AdvertiseRepository)
    private advertiseRepository: AdvertiseRepository,
  ) {}

  public createAdvertise(
    createAdvertiseDto: CreateAdvertiseDto,
    user: User,
  ): Promise<Advertise> {
    return this.advertiseRepository.createAdvertise(createAdvertiseDto, user);
  }

  public getAllAdvertises(): Promise<Advertise[]> {
    return this.advertiseRepository.getAllAdvertises();
  }

  public getAdvertise(id: string): Promise<Advertise> {
    return this.advertiseRepository.getAdvtise(id);
  }

  public deleteAdvertise(id: string, user: User): void {
    this.advertiseRepository.deleteAdvertise(id, user);
  }

  public updateAdvertise(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
    user: User,
  ): void {
    this.advertiseRepository.updateAdvertise(id, updateAdvertiseDto, user);
  }
}
