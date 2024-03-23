import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ProfileRepository } from 'src/repositories/profile.repository';
import { NoteRepository } from 'src/repositories/note.repository';
import { NoteCreateDTO, NoteUpdateDTO } from 'src/DTO/note.dto';

const NOTE_NOT_FOUND_ERROR = 'Note not found';

@Injectable()
export class NoteService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly noteRepository: NoteRepository,
  ) {}

  async createNote(newNote: NoteCreateDTO, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    return this.noteRepository.create(newNote, profile.id);
  }

  async getFeed(skip: number = 0, take: number = 50) {
    const notes = await this.noteRepository.getNotes(skip, take);

    return notes;
  }

  async getNoteById(noteId: string) {
    const note = await this.noteRepository.getNoteById(noteId);

    return note;
  }

  async getNotesByAuthorId(
    profileId: string,
    skip: number = 0,
    take: number = 50,
  ) {
    const notes = await this.noteRepository.getNotesByAuthorId(
      profileId,
      skip,
      take,
    );

    return notes;
  }

  async getNotesByTags(tags: string[], skip: number = 0, take: number = 50) {
    const notes = await this.noteRepository.getNotesByTags(tags, skip, take);

    return notes;
  }

  async getNotesByParentId(
    parentId: string,
    skip: number = 0,
    take: number = 50,
  ) {
    const notes = await this.noteRepository.getNotesByParentId(
      parentId,
      skip,
      take,
    );

    return notes;
  }

  async updateNote(noteId: string, note: NoteUpdateDTO, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const noteExists = await this.noteRepository.getNoteById(noteId);

    if (!noteExists || noteExists.authorId !== profile.id) {
      throw new HttpException(NOTE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const updatedNote = await this.noteRepository.updateNote(note, noteId);

    return updatedNote;
  }

  async deleteNoteById(noteId: string, accountId: string) {
    const deletedNote = await this.noteRepository.deleteNoteById(noteId);

    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const noteExists = await this.noteRepository.getNoteById(noteId);

    if (!noteExists || noteExists.authorId !== profile.id) {
      throw new HttpException(NOTE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    return deletedNote;
  }
}
