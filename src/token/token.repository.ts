import { NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  public async deleteToken(token: string): Promise<void> {
    const result: DeleteResult = await this.delete({ tokenValue: token });
    if (result.affected) {
      throw new NotFoundException(`user with this token is not found`);
    }
  }
}
