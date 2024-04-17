import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProfileCreateDTO, ProfileUpdateDTO } from 'src/DTO/profile.dto';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { FollowRepository } from 'src/repositories/follow.repository';
import { ProfileModel } from 'src/models/profile.model';
import { FollowModel } from 'src/models/follow.model';

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
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly followRepository: FollowRepository,
  ) {}

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

    return {
      count: profiles.length,
      profiles: ProfileModel.fromArray(profiles),
    };
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

    const profileExistsByProfileName =
      await this.profileRepository.getProfileBy({
        profileName: data.profileName,
      });

    if (profileExists || profileExistsByProfileName) {
      throw new HttpException(
        PROFILE_ALREADY_EXISTS_ERROR,
        HttpStatus.CONFLICT,
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

  public async followProfile(profileId: string, accountId: string) {
    const profile = await this.profileRepository.getProfileById(profileId);

    const account =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (!profile) {
      throw new HttpException(PROFILE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const isFollowing = await this.followRepository.isFollowing(
      profileId,
      account.id,
    );

    if (isFollowing) {
      throw new HttpException('Already following', HttpStatus.CONFLICT);
    }

    const follow = await this.followRepository.followProfile(
      profileId,
      account.id,
    );

    return new FollowModel(follow);
  }

  public async unfollowProfile(profileId: string, accountId: string) {
    const profile = await this.profileRepository.getProfileById(profileId);

    const account =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (!profile) {
      throw new HttpException(PROFILE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const isFollowing = await this.followRepository.isFollowing(
      profileId,
      account.id,
    );

    if (!isFollowing) {
      throw new HttpException('Not following', HttpStatus.CONFLICT);
    }

    await this.followRepository.unfollowProfile(profileId, account.id);

    return { message: 'Unfollowed' };
  }

  public async getFollowers(profileId: string) {
    const followers = await this.followRepository.getFollowers(profileId);

    return {
      count: followers.length,
      followers: FollowModel.fromArray(followers),
    };
  }

  public async getFollowing(profileId: string) {
    const following = await this.followRepository.getFollowing(profileId);

    return {
      count: following.length,
      following: FollowModel.fromArray(following),
    };
  }
}
