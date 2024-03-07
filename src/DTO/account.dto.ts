import { ApiProperty } from '@nestjs/swagger';

export interface AccountDTO {
  id: string;
  email: string;
  password?: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface AccountCreateDTO {
  email: string;
  password: string;
  username: string;
}

export class AccountCreateDTOSchema implements AccountCreateDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;
}

export interface AccountUpdateDTO {
  username?: string;
}

export class AccountUpdateDTOSchema implements AccountUpdateDTO {
  @ApiProperty({ required: false })
  username?: string;
}

export interface AccountDeleteDTO {
  id: string;
}

export class AccountDeleteDTOSchema implements AccountDeleteDTO {
  @ApiProperty()
  id: string;
}
