import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DynamicQueue, DynamicQueueCollection } from "./dynamic_queue.schema";

@Injectable()
export class DynamicQueueRepository {
  constructor(
    @InjectModel(DynamicQueueCollection)
    private readonly dynamicQueueModel: Model<DynamicQueue>
  ) {}

  async createDynamicQueue(data: any) {
    const dynamicQueue = new this.dynamicQueueModel(data);
    return dynamicQueue.save();
  }

  async getDynamicQueuesAsExecutor(executorId: Types.ObjectId) {
    return this.dynamicQueueModel
      .find({ executor: executorId })
      .populate("executor")
      .populate("organization_id")
      .populate("appointments");
  }

  async getDynamicQueuesAsClient(clientId: Types.ObjectId) {
    return this.dynamicQueueModel
      .find({ appointments: clientId })
      .populate("executor")
      .populate("organization_id")
      .populate("appointments");
  }

  async getById(id: string) {
    return this.dynamicQueueModel
      .findById(id)
      .populate("executor")
      .populate("organization_id")
      .populate("appointments");
  }

  async addAppointmentToDynamicQueue(id: string, userId: Types.ObjectId) {
    const dynamicQueue = await this.dynamicQueueModel.findById(id);
    if (!dynamicQueue) {
      throw new InternalServerErrorException("Dynamic queue not found");
    }

    Logger.log(dynamicQueue.appointments);

    if (dynamicQueue.appointments.includes(userId)) {
      throw new InternalServerErrorException(
        "Користувач вже записаний у цю чергу"
      );
    }

    dynamicQueue.appointments.push(userId);
    return await dynamicQueue.save();
  }

  async deleteAppointmentFromDynamicQueue(id: string, userId: Types.ObjectId) {
    const dynamicQueue = await this.dynamicQueueModel.findById(id);
    if (!dynamicQueue) {
      throw new InternalServerErrorException("Dynamic queue not found");
    }

    if (!dynamicQueue.appointments.includes(userId)) {
      throw new BadRequestException("Користувач не записаний у цю чергу");
    }

    dynamicQueue.appointments = dynamicQueue.appointments.filter(
      appointment => appointment.toString() !== userId.toString()
    );

    return await dynamicQueue.save();
  }

	async deleteDynamicQueue(id: Types.ObjectId) {
		const dynamicQueue = await this.dynamicQueueModel.findByIdAndDelete(id);
		if (!dynamicQueue) {
			throw new InternalServerErrorException("Dynamic queue not found");
		}
		return dynamicQueue;
	}
}
