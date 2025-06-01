import { Module } from '@nestjs/common';
import { OrganizationInviteService } from './organization_invite.service';
import { OrganizationInviteController } from './organization_invite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationInviteCollection, OrganizationInviteSchema } from './organization_invite.schema';
import { OrganizationInviteRepository } from './organization_invite.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: OrganizationInviteCollection, schema: OrganizationInviteSchema }
		])
	],
  controllers: [OrganizationInviteController],
  providers: [OrganizationInviteService, OrganizationInviteRepository],
})
export class OrganizationInviteModule {}
