import { Module } from "@nestjs/common";
import { DynamicQueuesService } from "./dynamic_queues.service";
import { DynamicQueuesController } from "./dynamic_queues.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DynamicQueueCollection,
  DynamicQueueSchema
} from "./dynamic_queue.schema";
import { OrganizationModule } from "../organization/organization.module";
import { DynamicQueueRepository } from "./dynamic_queue.repository";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DynamicQueueCollection,
        schema: DynamicQueueSchema
      }
    ]),
    OrganizationModule,
		UserModule
  ],
  controllers: [DynamicQueuesController],
  providers: [DynamicQueuesService, DynamicQueueRepository]
})
export class DynamicQueuesModule {}
