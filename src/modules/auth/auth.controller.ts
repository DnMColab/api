import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthValidation } from 'src/validation/auth.validation';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { AuthDTOSchema } from 'src/DTO/auth.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('/')
  @ApiOperation({
    operationId: 'proto.rest.auth',
    summary: 'Generate authorization token for RESTful API',
  })
  @ApiBody({ type: AuthDTOSchema })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Invalid credentials' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: { type: 'object', properties: { accessToken: { type: 'string' } } },
  })
  public async login(@Body(new ZodPipe(AuthValidation)) credentials) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  @ApiOperation({
    operationId: 'proto.rest.auth.refresh',
    summary: 'Refresh authorization token for RESTful API',
  })
  @ApiBearerAuth('Bearer')
  @ApiResponse({
    status: 200,
    schema: { type: 'object', properties: { accessToken: { type: 'string' } } },
  })
  public async refresh() {
    return '';
  }
}
