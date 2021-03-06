import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredintialsDto } from '../dto/auth-credintials.dto';
import { GetToken } from '../service/get-token.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'user has been created/register successfully.',
  })
  @ApiBadRequestResponse({ description: 'enter correct credintials' })
  public signUp(@Body() authCredintialsDto: AuthCredintialsDto): void {
    this.authService.signUp(authCredintialsDto);
  }

  @ApiBadRequestResponse({ description: 'enter correct credintials' })
  @Post('/signin')
  public signIn(
    @Body() authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }

  @ApiCreatedResponse({
    description: 'user has been created/register successfully.',
  })
  @ApiUnauthorizedResponse({ description: `user had'nt logged in` })
  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public logOut(@GetToken() token: string): Promise<DeleteResult> {
    if (!token) {
      throw new BadRequestException();
    }
    return this.authService.logout(token);
  }
}
