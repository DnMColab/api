import { ApiProperty } from '@nestjs/swagger';
import { TagDTO } from 'src/DTO/tag.dto';

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
