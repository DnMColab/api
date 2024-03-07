import { ApiProperty } from '@nestjs/swagger';

export interface TagDTO {
  id: string;

  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export class TagDTOSchema implements TagDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
