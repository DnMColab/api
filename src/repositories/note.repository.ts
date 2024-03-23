import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { NoteCreateDTO, NoteUpdateDTO } from 'src/DTO/note.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class NoteRepository {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(newNote: NoteCreateDTO, profileId: string) {
    const { tags, parentId, ...note } = newNote;

    const createdNote = await this.prismaClient.note.create({
      data: {
        ...note,
        author: {
          connect: {
            id: profileId,
          },
        },
      },
    });

    this.prismaClient.note.update({
      where: {
        id: createdNote.id,
      },
      data: {
        parentId: parentId ?? createdNote.id,
      },
    });

    let updatedNote;

    if (tags) {
      updatedNote = await this.updateNote(
        {
          ...createdNote,
          tags,
        },
        createdNote.id,
      );
    }

    return updatedNote;
  }

  public async getNotes(skip: number = 0, take: number = 10) {
    return this.prismaClient.note.findMany({
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

  public async getNoteById(id: string) {
    return this.prismaClient.note.findUnique({
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
  ) {
    return this.prismaClient.note.findMany({
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
  ) {
    return this.prismaClient.note.findMany({
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
  ) {
    return this.prismaClient.note.findMany({
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

  public async updateNote(data: NoteUpdateDTO, noteId: string) {
    const { tags, ...note } = data;

    const updatedNote = await this.prismaClient.note.update({
      where: {
        id: noteId,
      },
      data: note,
    });

    if (tags) {
      await this.prismaClient.note.update({
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

  public async deleteNoteById(id: string) {
    return this.prismaClient.note.delete({
      where: {
        id,
      },
    });
  }
}
