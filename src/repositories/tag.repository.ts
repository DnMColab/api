import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TagRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  createTag({ name, noteId }: { name: string; noteId: string }) {
    return this.prismaService.tag.create({
      data: {
        name,
        notes: {
          connect: {
            id: noteId,
          },
        },
      },
    });
  }
}
