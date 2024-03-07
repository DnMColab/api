import { ProfileDTO } from 'src/DTO/profile.dto';

export class ProfileModel {
  public readonly id: string;

  public profileName: string;
  public bio?: string;
  public avatarUrl?: string;
  public country: string;

  public accountId: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    profileName,
    bio,
    avatarUrl,
    accountId,
    createdAt,
    updatedAt,
  }: ProfileDTO) {
    this.id = id;
    this.profileName = profileName;
    this.bio = bio;
    this.avatarUrl = avatarUrl;
    this.accountId = accountId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
