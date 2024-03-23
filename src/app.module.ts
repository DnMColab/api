import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SecurityModule } from './modules/security/security.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoteModule } from './modules/note/note.module';
import { NoteService } from './modules/note/note.service';
import { ProfileRepository } from './repositories/profile.repository';
import { NoteRepository } from './repositories/note.repository';
import { PrismaClient } from '@prisma/client';
import { TagRepository } from './repositories/tag.repository';
import { AccountRepository } from './repositories/account.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NoteModule,
    AccountModule,
    AuthModule,
    ProfileModule,
    SecurityModule,
  ],
  providers: [
    NoteService,
    ProfileRepository,
    NoteRepository,
    PrismaClient,
    TagRepository,
    AccountRepository,
  ],
})
export class AppModule {}
