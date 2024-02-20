import { Injectable } from '@nestjs/common';
import {
  AccountCreateDTO,
  AccountDTO,
  AccountUpdateDTO,
} from '../DTO/account.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class AccountRepository {
  constructor(private prismaService: PrismaClient) {}

  async createAccount(data: AccountCreateDTO): Promise<AccountDTO> {
    const existingAccount = await this.prismaService.account.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
        ],
      },
    });

    if (existingAccount) {
      return null;
    }

    data.password = await hash(data.password, 16);

    return this.prismaService.account.create({
      data,
    });
  }

  async getAccountBy(filter: {
    email?: string;
    username?: string;
  }): Promise<AccountDTO> {
    return this.prismaService.account.findFirst({
      where: {
        ...filter,
      },
    });
  }

  async getAccountById(id: string): Promise<AccountDTO> {
    return this.prismaService.account.findUnique({
      where: {
        id,
      },
    });
  }

  async updateAccount(id: string, data: AccountUpdateDTO) {
    return this.prismaService.account.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAccount(id: string) {
    return this.prismaService.account.delete({
      where: {
        id,
      },
    });
  }
}
