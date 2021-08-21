import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredintialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
