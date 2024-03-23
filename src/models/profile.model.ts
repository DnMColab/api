import { ProfileDTO } from 'src/DTO/profile.dto';

export class ProfileModel {
  public readonly id: string;

  public profileName: string;
  public bio?: string;
  public avatarUrl?: string;

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

  static fromArray(profiles: ProfileDTO[]): ProfileModel[] {
    return profiles.map((profile) => new ProfileModel(profile));
  }

  public forEmbedded() {
    return {
      id: this.id,
      profileName: this.profileName,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      accountId: this.accountId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
