export interface ProfileDTO {
  id: string;

  bio?: string;
  avatarUrl?: string;
  profileName: string;
  country: string;

  accountId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileCreateDTO {
  bio?: string;
  avatarUrl?: string;
  profilename: string;
  country: string;
}

export interface ProfileUpdateDTO {
  bio?: string;
  avatarUrl?: string;
  profilename?: string;
  country?: string;
}
