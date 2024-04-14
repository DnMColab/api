import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestsSecurityService } from './services/requests.security.service';
import { ActionsSecurityService } from './services/actions.security.service';
import { JwtGuard } from 'src/guards/jwt.rest.guard';

import {
  SecurityVerifyProfilePath,
  SecurityRequestPath,
  SecurityRequestRejectPath,
  SecurityPasswordResetPath,
  SecurityEmailChangePath,
} from 'src/swagger/paths/security.paths';
import { RequestType } from '@prisma/client';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { z } from 'zod';

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
  @Post('email/change/:id/:token')
  @SecurityEmailChangePath()
  public async changeEmail(
    @Param('id') id: string,
    @Param('token') token: string,
    @Body(new ZodPipe(z.object({ email: z.string().email() })))
    body: { email: string },
  ) {
    return this.actionsSecurityService.changeEmail(body.email, id, token);
  }

  @UseGuards(JwtGuard)
  @Post('password/reset/:id/:token')
  @SecurityPasswordResetPath()
  public async resetPassword(
    @Param('id') id: string,
    @Param('token') token: string,
    @Body(new ZodPipe(z.object({ password: z.string() })))
    body: { password: string },
  ) {
    return this.actionsSecurityService.resetPassword(body.password, id, token);
  }

  @UseGuards(JwtGuard)
  @Post('request/send')
  @SecurityRequestPath()
  public async sendVerificationRequest(
    @Query(
      'type',
      new ZodPipe(
        z.enum(['EMAIL_VERIFICATION', 'EMAIL_CHANGE', 'PASSWORD_CHANGE']),
      ),
    )
    type: RequestType,
    @Req() request: Request & { account: { id: string } },
  ) {
    return this.requestsSecurityService.makeRequest(type, request.account.id);
  }

  @UseGuards(JwtGuard)
  @Post('request/last/reject')
  @SecurityRequestRejectPath()
  public async rejectLastRequest(
    @Req() request: Request & { account: { id: string } },
  ) {
    return this.requestsSecurityService.rejectVerificationRequest(
      request.account.id,
    );
  }
}
