import { Body, Controller, Post } from '@nestjs/common';
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
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }

  @Post('/logout')
  public logOut(): void {
    // this.authService.logout();
  }
}
