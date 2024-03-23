import { ApiProperty } from '@nestjs/swagger';
import { LikeDTO } from 'src/DTO/like.dto';

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
