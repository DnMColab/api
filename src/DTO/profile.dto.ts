import { ApiProperty } from '@nestjs/swagger';

export interface ProfileDTO {
  id: string;

  bio?: string;
  avatarUrl?: string;
  profileName: string;
  birthday: string;

  verified: boolean;

  accountId: string;

  createdAt: Date;
  updatedAt: Date;
}

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

export interface ProfileCreateDTO {
  bio?: string;
  avatarUrl?: string;
  profileName: string;
  birthday: string;
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

export interface ProfileUpdateDTO {
  bio?: string;
  avatarUrl?: string;
  profileName?: string;
  birthday?: string;

  verified?: boolean;
}

export class ProfileUpdateDTOSchema implements ProfileUpdateDTO {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty({ required: false })
  profileName?: string;

  @ApiProperty({ required: false })
  birthday?: string;

  @ApiProperty({ required: false })
  verified?: boolean;
}
