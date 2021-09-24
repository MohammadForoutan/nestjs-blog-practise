import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Token } from '../models/token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  public async deleteToken(token: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.delete({ tokenValue: token });
      if (result.affected < 1) {
        throw new NotFoundException(`user with this token is not found`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
