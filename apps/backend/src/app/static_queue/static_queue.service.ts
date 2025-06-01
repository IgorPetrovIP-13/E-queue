import { Injectable } from "@nestjs/common";
import { StaticQueueRepository } from "./static_queue.repository";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";
import { OrganizationService } from "../organization/organization.service";
import { Types } from "mongoose";

@Injectable()
export class StaticQueueService {
  constructor(
    private readonly staticQueueRepository: StaticQueueRepository,
    private readonly organizationService: OrganizationService
  ) {}

  async createStaticQueue(data: ICreateStaticQueueReq) {
    const staticQueue =
      await this.staticQueueRepository.createStaticQueue(data);
    const staticQueueId = staticQueue._id.toString();

    await this.organizationService.addQueue(
      data.organization_id,
      staticQueueId
    );

    return staticQueue;
  }

  async getStaticQueueAsExecutor(userId: Types.ObjectId) {
    return this.staticQueueRepository.getStaticQueueAsExecutor(userId);
  }

  async getStaticQueueAsUser(id: string) {
    return this.staticQueueRepository.getStaticQueueAsUser(id);
  }

  async addAppointmentToStaticQueue(
    staticQueueId: string,
    appointmentId: string
  ) {
    return this.staticQueueRepository.addAppointmentToStaticQueue(
      staticQueueId,
      appointmentId
    );
  }
}
