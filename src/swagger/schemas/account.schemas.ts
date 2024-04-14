import { ApiProperty } from '@nestjs/swagger';

import {
  AccountCreateDTO,
  AccountDTO,
  AccountDeleteDTO,
  AccountUpdateDTO,
} from 'src/DTO/account.dto';

export class AccountDTOSchema implements AccountDTO {
  @ApiProperty({ format: 'cuid' })
  id: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ minLength: 4, maxLength: 32 })
  username: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}

export class AccountCreateDTOSchema implements AccountCreateDTO {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 32 })
  password: string;

  @ApiProperty({ minLength: 4, maxLength: 32 })
  username: string;
}

export class AccountUpdateDTOSchema implements AccountUpdateDTO {
  @ApiProperty({ required: false, minLength: 4, maxLength: 32 })
  username?: string;
}

export class AccountDeleteDTOSchema implements AccountDeleteDTO {
  @ApiProperty({ format: 'cuid' })
  id: string;
}
