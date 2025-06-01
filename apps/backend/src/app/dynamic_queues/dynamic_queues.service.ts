import {
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { ICreateDynamicQueueReq } from "@repo/api/services/dynamic-queue/dynamic-queue.types";
import { DynamicQueueRepository } from "./dynamic_queue.repository";
import { OrganizationService } from "../organization/organization.service";
import { Types } from "mongoose";
import { UserService } from "../user/user.service";

@Injectable()
export class DynamicQueuesService {
  constructor(
    private readonly dynamicQueueRepository: DynamicQueueRepository,
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService
  ) {}

  async create(data: ICreateDynamicQueueReq) {
    const dynamicQueue =
      await this.dynamicQueueRepository.createDynamicQueue(data);
    const dynamicQueueId = dynamicQueue._id.toString();

    await this.organizationService.addDynamicQueue(
      data.organization_id,
      dynamicQueueId
    );

    return dynamicQueue;
  }

  async getDynamicQueuesAsExecutor(userId: Types.ObjectId) {
    return this.dynamicQueueRepository.getDynamicQueuesAsExecutor(userId);
  }

  async getDynamicQueuesAsClient(userId: Types.ObjectId) {
    return this.dynamicQueueRepository.getDynamicQueuesAsClient(userId);
  }

  async getDynamicQueueAsExecutor(id: string) {
    return this.dynamicQueueRepository.getById(id);
  }

  async getDynamicQueueAsClient(id: string) {
    return this.dynamicQueueRepository.getById(id);
  }

  async addAppointmentToDynamicQueue(id: string, userEmail: string) {
    const user = await this.userService.findByEmail(userEmail);

    if (!user) {
      throw new InternalServerErrorException(
        "Користувача з таким email не знайдено"
      );
    }

    await this.dynamicQueueRepository.addAppointmentToDynamicQueue(
      id,
      user._id as unknown as Types.ObjectId
    );

    return user;
  }

  async deleteAppointmentFromDynamicQueue(id: string, userId: Types.ObjectId) {
    const user = await this.userService.findById(userId);

    await this.dynamicQueueRepository.deleteAppointmentFromDynamicQueue(
      id,
      userId
    );

    return user;
  }

  async deleteMyAppointmentFromDynamicQueue(
    id: string,
    userId: Types.ObjectId
  ) {
    const data =
      await this.dynamicQueueRepository.deleteAppointmentFromDynamicQueue(
        id,
        userId
      );

    return data;
  }

  async deleteDynamicQueue(id: Types.ObjectId) {
    const deletedQueue =
      await this.dynamicQueueRepository.deleteDynamicQueue(id);

    if (deletedQueue) {
      await this.organizationService.deleteDynamicQueue(
        deletedQueue.organization_id.toString(),
        deletedQueue._id.toString()
      );
      return deletedQueue;
    }
  }
}
