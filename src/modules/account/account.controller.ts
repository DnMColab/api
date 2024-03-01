import { Body, Controller, Post } from '@nestjs/common';
import { AccountCreateDTO, AccountDTO } from 'src/DTO/account.dto';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { AccountCreateValidation } from 'src/validation/account.validation';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  public async register(
    @Body(new ZodPipe(AccountCreateValidation)) data: AccountCreateDTO,
  ) {
    const account: AccountDTO = await this.accountService.createAccount(data);

    return { id: account.id };
  }
}
