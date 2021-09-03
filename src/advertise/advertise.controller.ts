import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { Advertise } from './advertise.entity';
import { AdvertiseService } from './advertise.service';
import { CreateAdvertiseDto } from './dto/create-advertise.dto';
import { UpdateAdvertiseDto } from './dto/update-advertise.dto';

@Controller('advertise')
export class AdvertiseController {
  constructor(private advertiseService: AdvertiseService) {}

  @Post()
  @UseGuards(AuthGuard())
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
  public getAdvertise(@Param('id') id: string): Promise<Advertise> {
    return this.advertiseService.getAdvertise(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteAdvertise(@Param('id') id: string): void {
    this.advertiseService.deleteAdvertise(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  public updateAdvertise(
    @Param('id') id: string,
    @Body() updateAdvertiseDto: UpdateAdvertiseDto,
  ): void {
    this.advertiseService.updateAdvertise(id, updateAdvertiseDto);
  }
}
