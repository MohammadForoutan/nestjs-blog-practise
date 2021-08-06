import { EntityRepository, Repository } from 'typeorm';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<void> {
    const { username, password } = authCredintialsDto;

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE AND SAVE USER
    const user = this.create({ username, password: hashedPassword });

    await this.save(user);
  }
}
