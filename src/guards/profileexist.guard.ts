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
    try {
      const request = context.switchToHttp().getRequest();

      if (request.account == null) {
        throw new HttpException('Unauthorized', 401);
      }

      const profile = await this.profileRepository.getProfileByAccountId(
        request.account.id,
      );

      if (profile == null) {
        throw new HttpException('Profile not found', 404);
      }

      return true;
    } catch (error) {
      throw new HttpException('Error occured when validating profile', 401);
    }
  }
}
