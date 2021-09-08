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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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
  ): Promise<{ message: string }> {
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
