import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async createLike(profileId: string, noteId: string) {
    return this.prisma.like.create({
      data: {
        profile: {
          connect: {
            id: profileId,
          },
        },
        note: {
          connect: {
            id: noteId,
          },
        },
      },
    });
  }

  public async deleteLike(profileId: string, noteId: string) {
    return this.prisma.like.deleteMany({
      where: {
        profileId,
        noteId,
      },
    });
  }
}
