import { Injectable } from '@nestjs/common';

import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(public readonly profileRepository: ProfileRepository) {}
}
