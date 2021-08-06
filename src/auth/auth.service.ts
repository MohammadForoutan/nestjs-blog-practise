import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.createUser(authCredintialsDto);
  }
}
