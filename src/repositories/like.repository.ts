import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getLikesByNoteId(noteId: string) {
    return this.prisma.like.findMany({
      where: {
        noteId,
      },
    });
  }

  getLikesByProfileId(profileId: string) {
    return this.prisma.like.findMany({
      where: {
        profileId,
      },
    });
  }

  getLike(profileId: string, noteId: string) {
    return this.prisma.like.findFirst({
      where: {
        profileId,
        noteId,
      },
    });
  }

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
