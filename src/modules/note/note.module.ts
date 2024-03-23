import { Module } from '@nestjs/common';

import { ProfileRepository } from 'src/repositories/profile.repository';
import { NoteRepository } from 'src/repositories/note.repository';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TagRepository } from 'src/repositories/tag.repository';
import { PrismaClient } from '@prisma/client';
import { AccountRepository } from 'src/repositories/account.repository';

@Module({
  controllers: [NoteController],
  providers: [
    AccountRepository,
    ProfileRepository,
    NoteRepository,
    TagRepository,
    PrismaClient,
    NoteService,
  ],
})
export class NoteModule {}
