import { IsString } from 'class-validator';

export class UpdatePublishStatusDto {
  @IsString()
  publish: string;
}
