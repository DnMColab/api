import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileCreateDTO } from 'src/DTO/profile.dto';
import { ProfileRepository } from 'src/repositories/profile.repository';

const PROFILE_ALREADY_EXISTS_ERROR = 'Profile already exists';
const PROFILE_NOT_VERIFIED_ERROR = 'Profile already exists but not verified';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async createProfile(data: ProfileCreateDTO, accountId: string) {
    const profileExists =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (profileExists) {
      if (profileExists.verified)
        throw new HttpException(
          { message: PROFILE_ALREADY_EXISTS_ERROR },
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        { message: PROFILE_NOT_VERIFIED_ERROR },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.profileRepository.create(accountId, data);
  }
}
