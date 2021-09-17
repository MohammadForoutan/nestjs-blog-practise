import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { PUBLISH_STATUS } from '../models/publish-status.enum';

export class UpdatePublishStatusDto {
  @ApiProperty({
    default: null,
    enum: PUBLISH_STATUS,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PUBLISH_STATUS)
  publishStatus: string;
}
