import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FollowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async followProfile(profileId: string, followerId: string) {
    return this.prisma.follow.create({
      data: {
        follower: {
          connect: {
            id: followerId,
          },
        },
        following: {
          connect: {
            id: profileId,
          },
        },
      },
    });
  }

  public async unfollowProfile(profileId: string, followerId: string) {
    return this.prisma.follow.deleteMany({
      where: {
        followerId,
        followingId: profileId,
      },
    });
  }

  public async isFollowing(profileId: string, followerId: string) {
    return this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId: profileId,
      },
    });
  }

  public async getFollowers(followingId: string) {
    return this.prisma.follow.findMany({
      where: {
        followingId,
      },
    });
  }

  public async getFollowing(followerId: string) {
    return this.prisma.follow.findMany({
      where: {
        followerId,
      },
    });
  }
}
