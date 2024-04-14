import { Prisma, PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import {
  AccountCreateDTO,
  AccountDTO,
  AccountUpdateDTO,
} from '../DTO/account.dto';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaClient) {}

  async createAccount(data: AccountCreateDTO): Promise<AccountDTO> {
    return this.prisma.account.create({
      data,
    });
  }

  async getAccountBy(where: Prisma.AccountWhereInput): Promise<AccountDTO> {
    return this.prisma.account.findFirst({
      where,
    });
  }

  async getAccountById(id: string): Promise<AccountDTO> {
    return this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async updateAccount(id: string, data: AccountUpdateDTO): Promise<AccountDTO> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data,
    });
  }

  async changeEmail(id: string, email: string): Promise<AccountDTO> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }

  async changePassword(id: string, passwordHash: string): Promise<AccountDTO> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        password: passwordHash,
      },
    });
  }

  async deleteAccount(id: string): Promise<AccountDTO> {
    return this.prisma.account.delete({
      where: {
        id,
      },
    });
  }
}
