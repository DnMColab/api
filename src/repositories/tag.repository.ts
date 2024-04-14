import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { TagDTO } from 'src/DTO/tag.dto';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createTag({
    name,
    noteId,
  }: {
    name: string;
    noteId: string;
  }): Promise<TagDTO> {
    return this.prisma.tag.create({
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
