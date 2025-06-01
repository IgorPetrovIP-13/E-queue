import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  UserOrganizationSchema,
  UserOrganizationsCollection
} from "./user_organizations.schema";
import { UserOrganizationService } from "./user_organizations.service";
import { UserOrganizationRepository } from "./user_organizations.repository";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserOrganizationsCollection, schema: UserOrganizationSchema }
    ]),
		UserModule
  ],
  providers: [UserOrganizationService, UserOrganizationRepository],
  exports: [UserOrganizationService]
})
export class UserOrganizationModule {}
