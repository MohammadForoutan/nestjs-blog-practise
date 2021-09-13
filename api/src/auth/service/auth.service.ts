import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { UserRepository } from '../user/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
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

  public signUp(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ id: string; username: string; role: string }> {
    return this.userRepository.createUser(authCredintialsDto);
  }

  public async signIn(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    // find user
    const { username, password } = authCredintialsDto;
    const user = await this.userRepository.findOne({ username });

    // if user not exist
    if (!user) {
      throw new UnauthorizedException('Please check your login credintials.');
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      // create token
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      // insert token
      const newToken = this.tokenRepository.create({ tokenValue: accessToken });
      await this.tokenRepository.save(newToken);

      return { accessToken };
      // throw error if credintials is not correct
    } else {
      throw new UnauthorizedException('Please check your login credintials.');
    }
  }

  public async logout(token: string): Promise<string> {
    const result: DeleteResult = await this.tokenRepository.delete({
      tokenValue: token,
    });

    if (result.affected < 1) {
      throw new BadRequestException(`this user had not logged in`);
    }

    return 'user log out successfully';
  }
}
