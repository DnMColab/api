import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AccountCreateValidation } from 'src/validation/account.validation';
import { AccountRegisterPath } from 'src/swagger/paths/account.paths';
import { AccountCreateDTO, AccountDTO } from 'src/DTO/account.dto';
import { AccountService } from './account.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { JwtGuard } from 'src/guards/jwt.rest.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  @AccountRegisterPath()
  public async register(
    @Body(new ZodPipe(AccountCreateValidation)) data: AccountCreateDTO,
  ) {
    const account: AccountDTO = await this.accountService.createAccount(data);

    return { id: account.id };
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async getAccount(@Req() req: Request & { account: { id: string } }) {
    return this.accountService.getAccount(req.account.id);
  }
}
