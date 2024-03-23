import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthValidation } from 'src/validation/auth.validation';
import { JwtGuard } from 'src/guards/jwt.rest.guard';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { AuthDTO } from 'src/DTO/auth.dto';
import {
  RestAuthPath,
  RestAuthRefreshPath,
} from 'src/swagger/paths/auth.paths';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('/')
  @RestAuthPath()
  public async login(@Body(new ZodPipe(AuthValidation)) credentials: AuthDTO) {
    return this.authService.login(credentials);
  }

  @Post('/ws')
  public async wsLogin(
    @Body(new ZodPipe(AuthValidation)) credentials: AuthDTO,
  ) {
    return this.authService.wsLogin(credentials);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  @RestAuthRefreshPath()
  public async refresh(@Req() req: Request & { account: { id: string } }) {
    return this.authService.refresh(req.account.id);
  }
}
