export interface ProfileDTO {
  id: string;

  bio?: string;
  avatarUrl?: string;
  profileName: string;
  country: string;
  birthday: string;

  verified: boolean;

  accountId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileCreateDTO {
  bio?: string;
  avatarUrl?: string;
  profileName: string;
  country: string;
  birthday: string;
}

export interface ProfileUpdateDTO {
  bio?: string;
  avatarUrl?: string;
  profileName?: string;
  country?: string;
  birthday?: string;

  verified?: boolean;
}
