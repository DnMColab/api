import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { ProfileCreateValidation } from 'src/validation/profile.validation';
import { ProfileCreateDTO, ProfileCreateDTOSchema } from 'src/DTO/profile.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(public readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  @ApiOperation({
    operationId: 'proto.rest.profile.create',
    summary: 'Create a new profile',
  })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: ProfileCreateDTOSchema })
  public async createProfile(
    @Body(new ZodPipe(ProfileCreateValidation)) data: ProfileCreateDTO,
    @Req() req: Request & { account: { id: string } },
  ) {
    return this.profileService.createProfile(data, req.account.id);
  }
}
