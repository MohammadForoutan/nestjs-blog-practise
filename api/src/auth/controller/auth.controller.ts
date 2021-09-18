import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredintialsDto } from '../dto/auth-credintials.dto';
import { GetToken } from '../service/get-token.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public logOut(@GetToken() token: string): Promise<string> {
    return this.authService.logout(token);
  }
}
