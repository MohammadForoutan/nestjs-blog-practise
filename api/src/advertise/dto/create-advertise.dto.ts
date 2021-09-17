import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdvertiseDto {
  @ApiProperty({
    description: 'name for advertise banner, media, ... .',
    type: String,
    default: null,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    description: 'description for advertise.',
    type: String,
    default: null,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'media(photo/video) for advertise.',
    type: String,
    default: null,
  })
  @IsOptional()
  @IsString()
  media?: string;
}
