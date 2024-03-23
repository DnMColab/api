import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestsSecurityService } from './services/requests.security.service';
import { ActionsSecurityService } from './services/actions.security.service';
import { JwtGuard } from 'src/guards/jwt.rest.guard';

import {
  SecurityVerificationRequestPath,
  SecurityVerifyProfilePath,
} from 'src/swagger/paths/security.paths';

@ApiTags('security')
@Controller('security')
export class SecurityController {
  constructor(
    public readonly requestsSecurityService: RequestsSecurityService,
    public readonly actionsSecurityService: ActionsSecurityService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('account/verify/:id/:token')
  @SecurityVerifyProfilePath()
  public async verifyAccount(
    @Param('id') id: string,
    @Param('token') token: string,
  ) {
    return this.actionsSecurityService.verifyProfile({ accountId: id, token });
  }

  @UseGuards(JwtGuard)
  @Post('account/verify/request')
  @SecurityVerificationRequestPath()
  public async requestAccountVerification(
    @Req() request: Request & { account: { id: string } },
  ) {
    return this.requestsSecurityService.verificationRequest(request.account.id);
  }
}
