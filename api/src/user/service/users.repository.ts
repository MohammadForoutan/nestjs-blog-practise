import { EntityRepository, Repository } from 'typeorm';
import { AuthCredintialsDto } from '../../auth/dto/auth-credintials.dto';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<void> {
    const { username, password } = authCredintialsDto;

    // if username already exist
    const existUser = await this.findOne({ username });
    if (existUser) {
      throw new BadRequestException(
        `user with ${username} username is already exist`,
      );
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE AND SAVE USER
    const user = this.create({ username, password: hashedPassword });

    await this.save(user);
  }
}
