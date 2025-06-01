import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { StaticQueue, StaticQueueCollection } from "./static_queue.schema";
import { Model, Types } from "mongoose";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";

@Injectable()
export class StaticQueueRepository {
  constructor(
    @InjectModel(StaticQueueCollection)
    private readonly staticQueueModel: Model<StaticQueue>
  ) {}

  async createStaticQueue(data: ICreateStaticQueueReq) {
    const staticQueue = new this.staticQueueModel(data);
    return staticQueue.save();
  }

  async getStaticQueueAsExecutor(user_id: Types.ObjectId) {
    return this.staticQueueModel
      .find({ executor: user_id })
      .populate({
        path: "organization_id",
        populate: {
          path: "organization_type_id"
        }
      })
      .exec();
  }

  async getStaticQueueAsUser(id: string) {
    return this.staticQueueModel
      .findOne({ _id: id })
      .populate("organization_id")
      .populate({ path: "appointments", populate: { path: "user_id" } })
      .exec();
  }

  async addAppointmentToStaticQueue(
    staticQueueId: string,
    appointmentId: string
  ) {
    return this.staticQueueModel.findByIdAndUpdate(staticQueueId, {
      $addToSet: { appointments: appointmentId }
    });
  }
}
