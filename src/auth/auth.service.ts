import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.createUser(authCredintialsDto);
  }

  public async signIn(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredintialsDto;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Please check your login credintials.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credintials.');
    }
  }
}
