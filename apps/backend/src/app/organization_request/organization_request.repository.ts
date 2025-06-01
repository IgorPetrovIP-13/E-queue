import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  OrganizationRequest,
  OrganizationRequestCollection
} from "./organization_request.schema";
import { Model, Types } from "mongoose";
import { ICreateOrganizationRequestWithUserId } from "./organization_request.types";
import {
  OrganizationRequestStatus,
  OrganizationRequestStatuses
} from "@repo/core/enums/org-request-status";
import { Role, Roles } from "@repo/core/enums/roles";

@Injectable()
export class OrganizationRequestRepostitory {
  constructor(
    @InjectModel(OrganizationRequestCollection)
    private readonly organizationRequest: Model<OrganizationRequest>
  ) {}

  async create(
    data: ICreateOrganizationRequestWithUserId
  ): Promise<OrganizationRequest> {
    const organizationRequest = new this.organizationRequest(data);
    return organizationRequest.save();
  }

  async findByUserId(userId: Types.ObjectId): Promise<OrganizationRequest[]> {
    return this.organizationRequest
      .find({ user_id: userId })
      .populate("organization_type_id", "title")
      .exec();
  }

  async findAvailableRequests(): Promise<OrganizationRequest[]> {
    return this.organizationRequest
      .find({ status: OrganizationRequestStatuses.NOT_CHECKED })
      .populate("organization_type_id", "title")
      .exec();
  }

  async findById(id: Types.ObjectId): Promise<OrganizationRequest> {
    const organizationRequest = await this.organizationRequest
      .findById(id)
      .populate("organization_type_id", "title")
      .exec();

    if (!organizationRequest) {
      throw new Error("Organization request not found");
    }

    return organizationRequest;
  }

  async leaveComment(
    id: Types.ObjectId,
    userRole: Role,
    comment: string
  ): Promise<OrganizationRequest["comments"][number]> {
    const organizationRequest = await this.organizationRequest
      .findById(id)
      .exec();

    if (!organizationRequest) {
      throw new Error("Organization request not found");
    }

    const newComment = {
      comment,
      createdAt: new Date().toISOString(),
      isAdmin: userRole === Roles.ADMIN
    };

    organizationRequest.comments.push(newComment);
    await organizationRequest.save();

    return newComment;
  }

  async takeIntoProcessing(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<OrganizationRequest> {
    const updatedData = await this.organizationRequest.findByIdAndUpdate(id, {
      status: OrganizationRequestStatuses.PENDING,
      admin_id: userId
    });

    if (!updatedData) {
      throw new Error("Organization request not found");
    }

    return updatedData;
  }

  async findStatusById(id: Types.ObjectId): Promise<OrganizationRequestStatus> {
    const organizationRequest = await this.organizationRequest
      .findById(id)
      .select("status")
      .exec();

    if (!organizationRequest) {
      throw new Error("Organization request not found");
    }

    return organizationRequest.status;
  }

  async findRequestsUnderMyReview(
    userId: Types.ObjectId
  ): Promise<OrganizationRequest[]> {
    return this.organizationRequest
      .find({ admin_id: userId, status: OrganizationRequestStatuses.PENDING })
      .populate("organization_type_id", "title")
      .exec();
  }

  async approve(
    id: Types.ObjectId,
    comment: string
  ): Promise<OrganizationRequest> {
    const updatedData = await this.organizationRequest.findByIdAndUpdate(
      id,
      {
        status: OrganizationRequestStatuses.APPROVED,
        approval_comment: comment
      },
      { new: true }
    );
    if (!updatedData) {
      throw new Error("Organization request not found");
    }
    return updatedData;
  }

  async reject(
    id: Types.ObjectId,
    comment: string
  ): Promise<OrganizationRequest> {
    const updatedData = await this.organizationRequest.findByIdAndUpdate(
      id,
      {
        status: OrganizationRequestStatuses.REJECTED,
        rejection_comment: comment
      },
      { new: true }
    );
    if (!updatedData) {
      throw new Error("Organization request not found");
    }
    return updatedData;
  }
}
