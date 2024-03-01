import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ProfileCreateValidation } from 'src/validation/profile.validation';
import { ProfileCreateDTO } from 'src/DTO/profile.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ZodPipe } from 'src/pipes/zod.pipe';

@Controller('profile')
export class ProfileController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Post('/create')
  public async createProfile(
    @Body(new ZodPipe(ProfileCreateValidation)) data: ProfileCreateDTO,
    @Req() req: Request & { user: { id: string } },
  ) {
    console.log(data);

    console.log(req.user);
  }
}
