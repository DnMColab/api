import { ApiProperty } from '@nestjs/swagger';

import {
  ProfileCreateDTO,
  ProfileDTO,
  ProfileUpdateDTO,
} from 'src/DTO/profile.dto';

export class ProfileDTOSchema implements ProfileDTO {
  @ApiProperty({ format: 'cuid' })
  id: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false, format: 'url' })
  avatarUrl?: string;

  @ApiProperty({ minLength: 4, maxLength: 32 })
  profileName: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2000-01-01' })
  birthday: string;

  @ApiProperty({ type: 'boolean' })
  verified: boolean;

  @ApiProperty({ format: 'cuid' })
  accountId: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}

export class ProfileCreateDTOSchema implements ProfileCreateDTO {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false, format: 'url' })
  avatarUrl?: string;

  @ApiProperty({ minLength: 4, maxLength: 32 })
  profileName: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2000-01-01' })
  birthday: string;
}

export class ProfileUpdateDTOSchema implements ProfileUpdateDTO {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false, format: 'url' })
  profileName?: string;

  @ApiProperty({ required: false, format: 'url' })
  birthday?: string;

  @ApiProperty({ required: false, type: 'boolean' })
  verified?: boolean;
}

class ProfileNameSearchParams {
  @ApiProperty({ enum: ['insensitive'], required: false })
  mode?: 'insensitive';

  @ApiProperty({ type: 'string' })
  contains: string;
}

class ProfileSearchWhere {
  @ApiProperty()
  profileName: ProfileNameSearchParams;
}

class ProfileSearchOrderBy {
  @ApiProperty({ enum: ['asc', 'desc'] })
  createdAt: 'asc' | 'desc';
}

export class ProfileSearchSchema {
  @ApiProperty({ required: false })
  where: ProfileSearchWhere;

  @ApiProperty({ required: false })
  orderBy: ProfileSearchOrderBy;

  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false })
  take: number;
}
