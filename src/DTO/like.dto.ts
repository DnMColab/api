import { ApiProperty } from '@nestjs/swagger';

export interface LikeDTO {
  id: string;

  noteId: string;

  profileId: string;

  createdAt: Date;
  updatedAt: Date;
}

export class LikeDTOSchema implements LikeDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  noteId: string;

  @ApiProperty()
  profileId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
