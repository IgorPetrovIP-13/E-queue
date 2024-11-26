import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { IUserRequest } from '../common/interfaces/IUserRequest';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  get(@Req() req: IUserRequest) {
		return this.profileService.get(req.user.sub);
  }
}