import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { hasRoles } from '../../auth/service/roles.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { DeleteResult } from 'typeorm';
import { GetUser } from '../../user/service/get-user.decorator';
import { User } from '../../user/models/user.entity';
import { Advertise } from '../models/advertise.entity';
import { AdvertiseService } from '../service/advertise.service';
import { CreateAdvertiseDto } from '../dto/create-advertise.dto';
import { UpdateAdvertiseDto } from '../dto/update-advertise.dto';

@Controller('advertise')
export class AdvertiseController {
  constructor(private advertiseService: AdvertiseService) {}

  @Post()
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public createAdvertise(
    @Body() createAdvertiseDto: CreateAdvertiseDto,
    @GetUser() user: User,
  ): Promise<Advertise> {
    return this.advertiseService.createAdvertise(createAdvertiseDto, user);
  }

  @Get()
  public getAllAdvertises(): Promise<Advertise[]> {
    return this.advertiseService.getAllAdvertises();
  }

  @Get('/:id')
  public getAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Advertise> {
    return this.advertiseService.getAdvertise(id);
  }

  @Delete('/:id')
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public deleteAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteResult> {
    return this.advertiseService.deleteAdvertise(id);
  }

  @Put('/:id')
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public updateAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<Advertise> {
    return this.advertiseService.updateAdvertise(id, updateAdvertiseDto);
  }
}
