import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityRequestRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByToken(token: string) {
    return this.prisma.securityRequest.findFirst({
      where: {
        token,
      },
    });
  }

  async getByAccountId(accountId: string) {
    return this.prisma.securityRequest.findFirst({
      where: {
        accountId,
      },
    });
  }

  async create(accountId: string, data: { token: string; expires: number }) {
    return this.prisma.securityRequest.create({
      data: {
        token: data.token,
        expires: data.expires,
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });
  }

  async delete(accountId: string, token: string) {
    return this.prisma.securityRequest.deleteMany({
      where: {
        token,
        accountId,
      },
    });
  }
}
