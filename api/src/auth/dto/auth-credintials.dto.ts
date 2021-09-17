import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredintialsDto {
  @ApiProperty({
    default: null,
    required: true,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  username!: string;

  @ApiProperty({
    default: null,
    required: true,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password!: string;
}
