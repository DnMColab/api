import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  NoteCreateValidation,
  NoteUpdateValidation,
} from 'src/validation/note.validation';
import { ProfileExistGuard } from 'src/guards/profileexist.guard';
import { JwtGuard } from 'src/guards/jwt.rest.guard';
import { NoteCreateDTO } from 'src/DTO/note.dto';
import { NoteService } from './note.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import {
  NoteCreatePath,
  NoteDeletePath,
  NoteGetByIdPath,
  NoteGetFeedPath,
  NoteLikePath,
  NoteUnlikePath,
  NoteUpdatePath,
  NotesGetByAuthorIdPath,
  NotesGetByParentIdPath,
  NotesGetByTagsPath,
  NotesSearchPath,
} from 'src/swagger/paths/note.paths';
import { ApiTags } from '@nestjs/swagger';

@Controller('note')
@ApiTags('note')
export class NoteController {
  constructor(public readonly noteService: NoteService) {}

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Post('/create')
  @NoteCreatePath()
  public async createNote(
    @Req() req: Request & { account: { id: string } },
    @Body(new ZodPipe(NoteCreateValidation)) body: NoteCreateDTO,
  ) {
    return this.noteService.createNote(body, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/')
  @NotesSearchPath()
  public async searchNotes(
    @Query('query') query: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.searchNotes(query, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/feed')
  @NoteGetFeedPath()
  public async getFeed(
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getFeed(skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/tags')
  @NotesGetByTagsPath()
  public async getNotesByTags(
    @Query('tags') tags: string[],
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByTags(tags, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/parent/:parentId')
  @NotesGetByParentIdPath()
  public async getNotesByParentId(
    @Param('parentId') parentId: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByParentId(parentId, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/author/:authorId')
  @NotesGetByAuthorIdPath()
  public async getNotesByAuthorId(
    @Param('authorId') authorId: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByAuthorId(authorId, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Post('/:noteId/like')
  @NoteLikePath()
  public async likeNote(
    @Param('noteId') noteId: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.likeNote(noteId, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Post('/:noteId/unlike')
  @NoteUnlikePath()
  public async unlikeNote(
    @Param('noteId') noteId: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.unlikeNote(noteId, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:noteId')
  @NoteGetByIdPath()
  public async getNoteById(@Param('noteId') noteId: string) {
    return this.noteService.getNoteById(noteId);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Put('/:noteId')
  @NoteUpdatePath()
  public async updateNote(
    @Param('noteId') noteId: string,
    @Body(new ZodPipe(NoteUpdateValidation)) body: NoteCreateDTO,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.updateNote(noteId, body, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Delete('/:noteId')
  @NoteDeletePath()
  public async deleteNote(
    @Param('noteId') noteId: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.deleteNoteById(noteId, req.account.id);
  }
}
