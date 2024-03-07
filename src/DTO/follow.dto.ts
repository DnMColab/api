import { ApiProperty } from '@nestjs/swagger';

export interface FollowDTO {
  id: string;

  followerId: string;

  followingId: string;

  createdAt: Date;
  updatedAt: Date;
}

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
