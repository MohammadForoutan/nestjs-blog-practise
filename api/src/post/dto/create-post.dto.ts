import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    required: true,
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  body!: string;

  @ApiPropertyOptional({
    default: null,
    type: [String],
  })
  @IsOptional()
  tags: string[];
}
