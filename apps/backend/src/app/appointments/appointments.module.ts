import { Module } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { AppointmentsRepository } from "./appointments.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  AppointmentSchema,
  AppointmentsCollection
} from "./appointments.schema";
import { StaticQueueModule } from "../static_queue/static_queue.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AppointmentsCollection,
        schema: AppointmentSchema
      }
    ]),
		StaticQueueModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository]
})

export class AppointmentsModule {}
