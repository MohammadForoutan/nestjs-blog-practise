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
import { TokenRepository } from 'src/token/token.repository';

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
    token,
  ): Promise<{ accessToken: string }> {
    try {
      let isUserLogin;
      if (token) {
        console.log('///////########');

        isUserLogin = await this.tokenRepository.findOne({
          tokenValue: token,
        });
      }

      // if user already logged in
      if (isUserLogin) {
        throw new BadRequestException(`user already logged in`);
      }
      const { username, password } = authCredintialsDto;
      const user = await this.userRepository.findOne({ username });

      if (!user) {
        throw new UnauthorizedException('Please check your login credintials.');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        // add token to tokens
        const newToken = this.tokenRepository.create({ tokenValue: token });
        await this.tokenRepository.save(newToken);

        // return response
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credintials.');
      }
    } catch (err) {
      console.log({ err });
    }
  }
}
