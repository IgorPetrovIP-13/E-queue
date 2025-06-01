import { Module } from "@nestjs/common";
import { OrganizationRequestController } from "./organization_request.controller";
import { OrganizationRequestService } from "./organization_request.service";
import { OrganizationRequestRepostitory } from "./organization_request.repository";
import {
  OrganizationRequestCollection,
  OrganizationRequestSchema
} from "./organization_request.schema";
import { createAutopopulatedSchemaFeature } from "../core/utils/createAutopopulatedSchemaFeature";
import { OrganizationModule } from "../organization/organization.module";

@Module({
  imports: [
    createAutopopulatedSchemaFeature(
      OrganizationRequestCollection,
      OrganizationRequestSchema
    ),
		OrganizationModule,
  ],
  controllers: [OrganizationRequestController],
  providers: [OrganizationRequestService, OrganizationRequestRepostitory],
	exports: [OrganizationRequestService],
})
export class OrganizationRequestModule {}
