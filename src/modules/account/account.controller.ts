import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import {
  AccountCreateDTO,
  AccountCreateDTOSchema,
  AccountDTO,
} from 'src/DTO/account.dto';
import { AccountCreateValidation } from 'src/validation/account.validation';
import { AccountService } from './account.service';
import { ZodPipe } from 'src/pipes/zod.pipe';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  @ApiOperation({
    operationId: 'proto.rest.account.register',
    summary: 'Register a new account',
  })
  @ApiBody({ type: AccountCreateDTOSchema })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Account already exists',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: { type: 'object', properties: { id: { type: 'string' } } },
  })
  public async register(
    @Body(new ZodPipe(AccountCreateValidation)) data: AccountCreateDTO,
  ) {
    const account: AccountDTO = await this.accountService.createAccount(data);

    return { id: account.id };
  }
}
