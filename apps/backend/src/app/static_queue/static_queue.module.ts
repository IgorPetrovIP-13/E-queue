import { Module } from "@nestjs/common";
import { StaticQueueService } from "./static_queue.service";
import { StaticQueueController } from "./static_queue.controller";
import { StaticQueueRepository } from "./static_queue.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  StaticQueueCollection,
  StaticQueueSchema
} from "./static_queue.schema";
import { OrganizationModule } from "../organization/organization.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StaticQueueCollection,
        schema: StaticQueueSchema
      }
    ]),
		OrganizationModule,
  ],
  controllers: [StaticQueueController],
  providers: [StaticQueueService, StaticQueueRepository],
	exports: [StaticQueueService],
})
export class StaticQueueModule {}
