import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../models/jwt-payload.interface';
import { User } from '../../user/models/user.entity';
import { UserRepository } from '../../user/service/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload) {
    const { username } = payload;
    try {
      const user: User = await this.userRepository.findOne({ username });
      if (!user) {
        throw new UnauthorizedException('Please check your login credintials.');
      }

      //eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
