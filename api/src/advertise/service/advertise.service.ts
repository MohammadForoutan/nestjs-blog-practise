import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { Advertise } from '../models/advertise.entity';
import { AdvertiseRepository } from './advertise.repository';
import { CreateAdvertiseDto } from '../dto/create-advertise.dto';
import { UpdateAdvertiseDto } from '../dto/update-advertise.dto';

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
    return this.advertiseRepository.createOne(createAdvertiseDto, user);
  }

  public getAllAdvertises(): Promise<Advertise[]> {
    return this.advertiseRepository.getAll();
  }

  public getOneAdvertise(id: string): Promise<Advertise> {
    return this.advertiseRepository.getOneById(id);
  }

  public deleteAdvertise(id: string): Promise<DeleteResult> {
    return this.advertiseRepository.deleteOne(id);
  }

  public updateAdvertise(
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<UpdateResult> {
    return this.advertiseRepository.updateOne(id, updateAdvertiseDto);
  }
}
