import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizationCollection, OrganizationSchema } from "./organization.schema";
import { OrganizationController } from "./organization.controller";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationService } from "./organization.service";
import { UserOrganizationModule } from "../user_organizations/user_organizations.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: OrganizationCollection, schema: OrganizationSchema }
		]),
		UserOrganizationModule,
	],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository],
	exports: [OrganizationService]
})
export class OrganizationModule {}
