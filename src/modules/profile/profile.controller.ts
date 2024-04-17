import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ProfileCreateValidation,
  ProfileUpdateValidation,
  ProfilesGetValidation,
} from 'src/validation/profile.validation';
import {
  ProfileCreatePath,
  ProfileGetByIdPath,
  ProfilesSearchPath,
  ProfileGetCurrentPath,
  ProfileUpdatePath,
} from 'src/swagger/paths/profile.paths';
import { ProfileCreateDTO, ProfileUpdateDTO } from 'src/DTO/profile.dto';
import { JwtGuard } from 'src/guards/jwt.rest.guard';
import { ProfileSearchParameters, ProfileService } from './profile.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { ProfileExistGuard } from 'src/guards/profileexist.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(public readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  @ProfileCreatePath()
  public async createProfile(
    @Body(new ZodPipe(ProfileCreateValidation)) data: ProfileCreateDTO,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.profileService.createProfile(data, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Put('/update')
  @ProfileUpdatePath()
  public async updateProfile(
    @Body(new ZodPipe(ProfileUpdateValidation)) data: ProfileUpdateDTO,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.profileService.updateProfile(data, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/')
  @ProfileGetCurrentPath()
  public async getProfile(@Req() req: Request & { account: { id: string } }) {
    return this.profileService.getProfile(req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/search')
  @ProfilesSearchPath()
  public async searchProfiles(
    @Body(new ZodPipe(ProfilesGetValidation))
    data: ProfileSearchParameters,
  ) {
    return this.profileService.getProfiles(data);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Post('/:id/follow')
  public async followProfile(
    @Param('id') id: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.profileService.followProfile(id, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:id/followers')
  public async getFollowers(@Param('id') id: string) {
    return this.profileService.getFollowers(id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:id/following')
  public async getFollowing(@Param('id') id: string) {
    return this.profileService.getFollowing(id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:id/unfollow')
  public async unfollowProfile(
    @Param('id') id: string,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.profileService.unfollowProfile(id, req.account.id);
  }

  @UseGuards(JwtGuard, ProfileExistGuard)
  @Get('/:id')
  @ProfileGetByIdPath()
  public async getProfileById(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }
}
