import { ApiProperty } from '@nestjs/swagger';

import {
  AccountCreateDTO,
  AccountDTO,
  AccountDeleteDTO,
  AccountUpdateDTO,
} from 'src/DTO/account.dto';

export class AccountDTOSchema implements AccountDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AccountCreateDTOSchema implements AccountCreateDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;
}

export class AccountUpdateDTOSchema implements AccountUpdateDTO {
  @ApiProperty({ required: false })
  username?: string;
}

export class AccountDeleteDTOSchema implements AccountDeleteDTO {
  @ApiProperty()
  id: string;
}
