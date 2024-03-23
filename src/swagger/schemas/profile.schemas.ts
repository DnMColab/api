import { ApiProperty } from '@nestjs/swagger';

import {
  ProfileCreateDTO,
  ProfileDTO,
  ProfileUpdateDTO,
} from 'src/DTO/profile.dto';

export class ProfileDTOSchema implements ProfileDTO {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty()
  profileName: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ProfileCreateDTOSchema implements ProfileCreateDTO {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty()
  profileName: string;

  @ApiProperty()
  birthday: string;
}

export class ProfileUpdateDTOSchema implements ProfileUpdateDTO {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  profileName?: string;

  @ApiProperty({ required: false })
  birthday?: string;

  @ApiProperty({ required: false })
  verified?: boolean;
}

class ProfileSearchWhere {
  @ApiProperty({ enum: ['insensitive'] })
  mode?: 'insensitive';

  @ApiProperty()
  profileName: {
    contains: string;
    mode?: 'insensitive';
  };
}

class ProfileSearchOrderBy {
  @ApiProperty({ enum: ['asc', 'desc'] })
  createdAt: 'asc' | 'desc';
}

export class ProfileSearchSchema {
  @ApiProperty()
  where: ProfileSearchWhere;

  @ApiProperty()
  orderBy: ProfileSearchOrderBy;

  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;
}
