import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { GetToken } from './get-token.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(
    @Body() authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ id: string; username: string; role: string }> {
    return this.authService.signUp(authCredintialsDto);
  }

  @Post('/signin')
  public signIn(
    @Body() authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public logOut(@GetToken() token: string): Promise<string> {
    return this.authService.logout(token);
  }
}
