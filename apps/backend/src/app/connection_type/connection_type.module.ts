import { Module } from "@nestjs/common";
import { ConnectionTypeController } from "./connection_type.controller";
import { ConnectionTypeService } from "./connection_type.service";
import { ConnectionTypeRepository } from "./connection_type.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ConnectionTypeCollection,
  ConnectionTypeSchema
} from "./connection_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConnectionTypeCollection, schema: ConnectionTypeSchema }
    ])
  ],
  controllers: [ConnectionTypeController],
  providers: [ConnectionTypeService, ConnectionTypeRepository]
})
export class ConnectionTypeModule {}
