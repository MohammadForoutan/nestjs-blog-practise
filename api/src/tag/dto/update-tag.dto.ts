import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    required: true,
    default: null,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
