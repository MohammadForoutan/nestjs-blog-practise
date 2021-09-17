import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdvertiseDto {
  @ApiProperty({
    required: true,
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  media?: string;
}
