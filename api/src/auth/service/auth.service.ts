import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialsDto } from '../dto/auth-credintials.dto';
import { UserRepository } from '../../user/service/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.interface';
import { TokenRepository } from './token.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
  ) {}

  public signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.createUser(authCredintialsDto);
  }

  public async signIn(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      // find user
      const { username, password } = authCredintialsDto;
      const user = await this.userRepository.findOne({ username });

      // if user not exist
      if (!user) {
        throw new UnauthorizedException('Please check your login credintials.');
      }
      // check password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      // if password is wrong
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Please check your login credintials.');
      }
      // create token
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      // insert token
      const newToken = this.tokenRepository.create({ tokenValue: accessToken });
      await this.tokenRepository.save(newToken);

      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async logout(token: string): Promise<DeleteResult> {
    return this.tokenRepository.deleteToken(token);
  }
}
