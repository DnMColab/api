import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class ProfileExistGuard implements CanActivate {
  constructor(private profileRepository: ProfileRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.account == null) {
      throw new HttpException('Unauthorized', 401);
    }

    const profile = await this.profileRepository.getProfileByAccountId(
      request.account.id,
    );

    if (profile == null) {
      throw new HttpException('Account does not have a linked profile', 404);
    }

    if (!profile.verified) {
      throw new HttpException('Profile is not verified', 400);
    }

    return true;
  }
}
