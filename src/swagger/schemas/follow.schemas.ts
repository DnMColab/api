import { ApiProperty } from '@nestjs/swagger';
import { FollowDTO } from 'src/DTO/follow.dto';

export class FollowDTOSchema implements FollowDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  followerId: string;

  @ApiProperty()
  followingId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
