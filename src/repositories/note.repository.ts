import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from 'src/DTO/note.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class NoteRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(
    newNote: NoteCreateDTO,
    profileId: string,
  ): Promise<NoteDTO> {
    const { tags, parentId, ...note } = newNote;

    const createdNote = await this.prisma.note.create({
      data: {
        ...note,
        author: {
          connect: {
            id: profileId,
          },
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        parent: parentId
          ? {
              connect: {
                id: parentId,
              },
            }
          : undefined,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    return createdNote;
  }

  public async searchNotes(
    query: string,
    skip: number = 0,
    take: number = 50,
  ): Promise<NoteDTO[]> {
    return this.prisma.note.findMany({
      where: {
        body: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
    });
  }

  public async getNotes(
    skip: number = 0,
    take: number = 10,
  ): Promise<NoteDTO[]> {
    return this.prisma.note.findMany({
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async getNoteById(id: string): Promise<NoteDTO> {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async getNotesByAuthorId(
    authorId: string,
    skip: number = 0,
    take: number = 50,
  ): Promise<NoteDTO[]> {
    return this.prisma.note.findMany({
      where: {
        authorId,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async getNotesByParentId(
    parentId: string,
    skip: number = 0,
    take: number = 50,
  ): Promise<NoteDTO[]> {
    return this.prisma.note.findMany({
      where: {
        parentId,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async getNotesByTags(
    tags: string[],
    skip: number = 0,
    take: number = 50,
  ): Promise<NoteDTO[]> {
    return this.prisma.note.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async updateNote(
    data: NoteUpdateDTO,
    noteId: string,
  ): Promise<NoteDTO> {
    const { tags, ...note } = data;

    const updatedNote = await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: note,
    });

    if (tags) {
      await this.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
        include: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    return updatedNote;
  }

  public async deleteNoteById(id: string): Promise<NoteDTO> {
    return this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
