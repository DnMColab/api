import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import {
  ProfileCreateDTO,
  ProfileDTO,
  ProfileUpdateDTO,
} from 'src/DTO/profile.dto';

@Injectable()
export class ProfileRepository {
  constructor(public readonly prisma: PrismaClient) {}

  public async create(
    accountId: string,
    profile: ProfileCreateDTO,
  ): Promise<ProfileDTO> {
    return this.prisma.profile.create({
      data: {
        ...profile,
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });
  }

  public async getProfileBy(
    where: Prisma.ProfileWhereInput,
  ): Promise<ProfileDTO | null> {
    return this.prisma.profile.findFirst({
      where,
    });
  }

  public async getProfileById(id: string): Promise<ProfileDTO | null> {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }

  public async getProfilesBy(
    where: Prisma.ProfileWhereInput,
    orderBy?:
      | Prisma.ProfileOrderByWithAggregationInput
      | Prisma.ProfileOrderByWithRelationInput,
  ): Promise<ProfileDTO[]> {
    return this.prisma.profile.findMany({
      where,
      orderBy,
    });
  }

  public async updateProfile(
    id: string,
    data: ProfileUpdateDTO,
  ): Promise<ProfileDTO> {
    return this.prisma.profile.update({
      where: {
        id,
      },
      data,
    });
  }

  public async deleteProfile(id: string): Promise<ProfileDTO> {
    return this.prisma.profile.delete({
      where: {
        id,
      },
    });
  }
}
