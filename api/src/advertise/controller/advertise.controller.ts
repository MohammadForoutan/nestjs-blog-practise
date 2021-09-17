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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('advertise')
@Controller('advertise')
export class AdvertiseController {
  constructor(private advertiseService: AdvertiseService) {}

  @Post()
  @ApiCreatedResponse({ description: 'post has been created successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public createAdvertise(
    @Body() createAdvertiseDto: CreateAdvertiseDto,
    @GetUser() user: User,
  ): Promise<Advertise> {
    return this.advertiseService.createAdvertise(createAdvertiseDto, user);
  }

  @Get()
  @ApiOkResponse({ description: 'all advertise retrieve successfully.' })
  public getAllAdvertises(): Promise<Advertise[]> {
    return this.advertiseService.getAllAdvertises();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'one advertise retrieves successfully.' })
  public getAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Advertise> {
    return this.advertiseService.getAdvertise(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'post has been deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({
    description: 'Forbidden !!!',
  })
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public deleteAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteResult> {
    return this.advertiseService.deleteAdvertise(id);
  }

  @Put('/:id')
  @ApiOkResponse({ description: 'post has been updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @ApiParam({ name: 'id', required: true })
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public updateAdvertise(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdvertiseDto: UpdateAdvertiseDto,
  ): Promise<Advertise> {
    return this.advertiseService.updateAdvertise(id, updateAdvertiseDto);
  }
}
