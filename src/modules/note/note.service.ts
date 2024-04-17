import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ProfileRepository } from 'src/repositories/profile.repository';
import { NoteRepository } from 'src/repositories/note.repository';
import { NoteCreateDTO, NoteUpdateDTO } from 'src/DTO/note.dto';
import { NoteModel } from 'src/models/note.model';
import { LikeRepository } from 'src/repositories/like.repository';

const NOTE_NOT_FOUND_ERROR = 'Note not found';

@Injectable()
export class NoteService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly noteRepository: NoteRepository,
  ) {}

  async createNote(newNote: NoteCreateDTO, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (newNote.parentId) {
      const parentNote = await this.noteRepository.getNoteById(
        newNote.parentId,
      );

      if (!parentNote) {
        throw new HttpException('Parent note not found', HttpStatus.NOT_FOUND);
      }
    }

    const createdNote = await this.noteRepository.create(newNote, profile.id);

    return new NoteModel(createdNote);
  }

  async searchNotes(query: string, skip: number = 0, take: number = 50) {
    const notes = await this.noteRepository.searchNotes(query, skip, take);

    return {
      count: notes.length,
      notes: NoteModel.fromArray(notes),
    };
  }

  async getFeed(skip: number = 0, take: number = 50) {
    const notes = await this.noteRepository.getNotes(skip, take);

    return {
      count: notes.length,
      notes: NoteModel.fromArray(notes),
    };
  }

  async getNoteById(noteId: string) {
    const note = await this.noteRepository.getNoteById(noteId);

    return new NoteModel(note);
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

    return {
      count: notes.length,
      notes: NoteModel.fromArray(notes),
    };
  }

  async getNotesByTags(tags: string[], skip: number = 0, take: number = 50) {
    const notes = await this.noteRepository.getNotesByTags(tags, skip, take);

    return {
      count: notes.length,
      notes: NoteModel.fromArray(notes),
    };
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

    return {
      count: notes.length,
      notes: NoteModel.fromArray(notes),
    };
  }

  async updateNote(noteId: string, note: NoteUpdateDTO, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const noteExists = await this.noteRepository.getNoteById(noteId);

    if (!noteExists || noteExists.authorId !== profile.id) {
      throw new HttpException(NOTE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    if (Object.keys(note).length === 0) {
      throw new HttpException(
        'Please provide data to update the note',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedNote = await this.noteRepository.updateNote(note, noteId);

    return new NoteModel(updatedNote);
  }

  async likeNote(noteId: string, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const noteExists = await this.noteRepository.getNoteById(noteId);

    if (!noteExists) {
      throw new HttpException(NOTE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const like = await this.likeRepository.createLike(profile.id, noteId);

    return like;
  }

  async unlikeNote(noteId: string, accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const noteExists = await this.noteRepository.getNoteById(noteId);

    if (!noteExists) {
      throw new HttpException(NOTE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const like = await this.likeRepository.deleteLike(profile.id, noteId);

    return like;
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
