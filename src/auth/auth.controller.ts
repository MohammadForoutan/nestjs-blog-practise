import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body() authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authService.signUp(authCredintialsDto);
  }

  @Post('/signin')
  public signIp(
    @Body() authCredintialsDto: AuthCredintialsDto,
    @Req() req,
  ): Promise<{ accessToken: string }> {
    const token = req.headers.authentication;
    return this.authService.signIn(authCredintialsDto, token);
  }

  @Post('/logout')
  public logOut(): void {
    // this.authService.logout();
  }
}
