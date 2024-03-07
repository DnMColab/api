import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from 'src/guards/jwt.guard';
import { SecurityService } from './security.service';

@ApiTags('security')
@Controller('security')
export class SecurityController {
  constructor(public readonly securityService: SecurityService) {}

  @Post('account/verify/:id/:token')
  @ApiOperation({
    operationId: 'proto.rest.security.verify',
    summary: 'Verify account',
  })
  @ApiParam({ name: 'code', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth('Bearer')
  public async verifyAccount(
    @Param('id') id: string,
    @Param('token') token: string,
  ) {
    return this.securityService.verifyProfile({ accountId: id, token });
  }

  @UseGuards(JwtGuard)
  @Post('account/verify/request')
  @ApiOperation({
    operationId: 'proto.rest.security.verify.request',
    summary: 'Request account verification',
  })
  @ApiBearerAuth('Bearer')
  @ApiResponse({
    status: 400,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'verification email already sent',
        },
      },
    },
  })
  public async requestAccountVerification(
    @Req() request: Request & { account: { id: string } },
  ) {
    return this.securityService.verificationRequest(request.account.id);
  }
}
