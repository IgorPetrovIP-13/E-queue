import { Injectable } from "@nestjs/common";
import { OrganizationRequestRepostitory } from "./organization_request.repository";
import { Types } from "mongoose";
import { OrganizationRequest } from "./organization_request.schema";
import { ICreateOrganizationRequestWithUserId } from "./organization_request.types";
import { Role } from "@repo/core/enums/roles";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SocketEvents } from "@repo/core/constants/socket-events";
import { OrganizationService } from "../organization/organization.service";

@Injectable()
export class OrganizationRequestService {
  constructor(
    private readonly organizationRequestRepository: OrganizationRequestRepostitory,
    private readonly organizationService: OrganizationService,
    private readonly events: EventEmitter2
  ) {}

  async create(
    data: ICreateOrganizationRequestWithUserId
  ): Promise<OrganizationRequest> {
    return await this.organizationRequestRepository.create(data);
  }

  async findMyRequests(userId: Types.ObjectId): Promise<OrganizationRequest[]> {
    return await this.organizationRequestRepository.findByUserId(userId);
  }

  async findAvailableRequests(): Promise<OrganizationRequest[]> {
    return await this.organizationRequestRepository.findAvailableRequests();
  }

  async findById(id: Types.ObjectId): Promise<OrganizationRequest> {
    return await this.organizationRequestRepository.findById(id);
  }

  async leaveComment(id: Types.ObjectId, role: Role, comment: string) {
    const data = await this.organizationRequestRepository.leaveComment(
      id,
      role,
      comment
    );

    this.events.emit(SocketEvents.ORGANIZATION_REQUEST_CHAT_COMMENT, {
      room: `org_request_${id}`,
      message: data
    });

    return data;
  }

  async findStatusById(id: Types.ObjectId) {
    return await this.organizationRequestRepository.findStatusById(id);
  }

  async takeIntoProcessing(id: Types.ObjectId, userId: Types.ObjectId) {
    return await this.organizationRequestRepository.takeIntoProcessing(
      id,
      userId
    );
  }

  async findRequestsUnderMyReview(
    userId: Types.ObjectId
  ): Promise<OrganizationRequest[]> {
    return await this.organizationRequestRepository.findRequestsUnderMyReview(
      userId
    );
  }

  async approve(id: Types.ObjectId, comment: string) {
    const data = await this.organizationRequestRepository.approve(id, comment);

    const dataForOrg = {
      user_id: data.user_id,
      organization_logo: data.organization_logo,
      organization_type_id: data.organization_type_id,
      organization_title: data.organization_title,
      organization_description: data.organization_description,
      organization_website: data.organization_website as string,
    };
    await this.organizationService.create(dataForOrg);
		
    return data;
  }

  async reject(id: Types.ObjectId, comment: string) {
    const data = await this.organizationRequestRepository.reject(id, comment);
    return data;
  }
}
