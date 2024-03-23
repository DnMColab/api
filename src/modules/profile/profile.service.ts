import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProfileCreateDTO, ProfileUpdateDTO } from 'src/DTO/profile.dto';
import { ProfileModel } from 'src/models/profile.model';
import { ProfileRepository } from 'src/repositories/profile.repository';

const PROFILE_ALREADY_EXISTS_ERROR = 'Profile already exists';
const PROFILE_NOT_FOUND_ERROR = 'Profile not found';

export interface ProfileSearchParameters {
  where: Prisma.ProfileWhereInput;
  orderBy: Prisma.ProfileOrderByWithAggregationInput;
  skip: number;
  take: number;
}

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async getProfiles(
    { where, orderBy, skip, take }: ProfileSearchParameters = {
      where: {},
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 50,
    },
  ) {
    const profiles = await this.profileRepository.getProfilesBy(
      where,
      orderBy,
      skip,
      take,
    );

    return ProfileModel.fromArray(profiles);
  }

  public async getProfileById(id: string) {
    const profile = await this.profileRepository.getProfileById(id);

    if (!profile)
      throw new HttpException(PROFILE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);

    return new ProfileModel(profile);
  }

  public async getProfile(accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    return new ProfileModel(profile);
  }

  public async createProfile(data: ProfileCreateDTO, accountId: string) {
    const profileExists =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (profileExists) {
      throw new HttpException(
        PROFILE_ALREADY_EXISTS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.profileRepository.create(accountId, data);

    return new ProfileModel(account);
  }

  public async updateProfile(data: ProfileUpdateDTO, accountId: string) {
    if (Object.keys(data).length === 0) {
      throw new HttpException('Data is empty', HttpStatus.BAD_REQUEST);
    }

    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    const updatedProfile = await this.profileRepository.updateProfile(
      profile.id,
      data,
    );

    return new ProfileModel(updatedProfile);
  }
}
