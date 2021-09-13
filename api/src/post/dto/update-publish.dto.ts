import { IsEnum } from 'class-validator';
import { PUBLISH_STATUS } from '../models/publish-status.enum';

export class UpdatePublishStatusDto {
  @IsEnum(PUBLISH_STATUS)
  publishStatus: string;
}
