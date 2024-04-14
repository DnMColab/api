import { PrismaClient, RequestType } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { SecurityRequestDTO } from 'src/DTO/securityrequest.dto';

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

  async getByAccountId(accountId: string): Promise<SecurityRequestDTO> {
    return this.prisma.securityRequest.findFirst({
      where: {
        accountId,
      },
    });
  }

  async create(
    accountId: string,
    data: { token: string; expires: number; type: RequestType },
  ) {
    return this.prisma.securityRequest.create({
      data: {
        token: data.token,
        expires: data.expires,
        type: data.type,
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });
  }

  async delete(accountId: string, token: string) {
    return await this.prisma.securityRequest.delete({
      where: {
        token,
        accountId,
      },
    });
  }
}
