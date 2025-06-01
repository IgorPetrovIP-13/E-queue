import { Module } from "@nestjs/common";
import { OrganizationTypeController } from "./organization_type.controller";
import { OrganizationTypeService } from "./organization_type.service";
import { OrganizationTypeRepository } from "./organization_type.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  OrganizationTypeCollection,
  OrganizationTypeSchema
} from "./organization_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationTypeCollection, schema: OrganizationTypeSchema }
    ])
  ],
  controllers: [OrganizationTypeController],
  providers: [OrganizationTypeService, OrganizationTypeRepository]
})
export class OrganizationTypeModule {}
