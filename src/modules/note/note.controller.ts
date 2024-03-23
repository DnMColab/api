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

import { NoteCreateValidation } from 'src/validation/note.validation';
import { ProfileExistGuard } from 'src/guards/profileexist.guard';
import { JwtGuard } from 'src/guards/jwt.rest.guard';
import { NoteCreateDTO } from 'src/DTO/note.dto';
import { NoteService } from './note.service';
import { ZodPipe } from 'src/pipes/zod.pipe';

@Controller('note')
export class NoteController {
  constructor(public readonly noteService: NoteService) {}

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Post('/create')
  public async createNote(
    @Req() req: Request & { account: { id: string } },
    @Body(new ZodPipe(NoteCreateValidation)) body: NoteCreateDTO,
  ) {
    return this.noteService.createNote(body, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/feed')
  public async getFeed(
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getFeed(skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/tags')
  public async getNotesByTags(
    @Query('tags') tags: string[],
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByTags(tags, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/parent/:parentId')
  public async getNotesByParentId(
    @Param('parentId') parentId: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByParentId(parentId, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search/author/:authorId')
  public async getNotesByAuthorId(
    @Param('authorId') authorId: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.noteService.getNotesByAuthorId(authorId, skip ?? 0, take ?? 50);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:noteId')
  public async getNoteById(@Param('noteId') noteId: string) {
    return this.noteService.getNoteById(noteId);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Put('/:noteId')
  public async updateNote(
    @Param('noteId') noteId: string,
    @Body(new ZodPipe(NoteCreateValidation)) body: NoteCreateDTO,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.updateNote(noteId, body, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Delete('/:noteId')
  public async deleteNote(
    @Param('noteId') noteId: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.noteService.deleteNoteById(noteId, req.account.id);
  }
}
