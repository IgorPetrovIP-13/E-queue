import { Injectable, Logger } from "@nestjs/common";
import { IOrganizationInviteWithUserId } from "./typedefs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  OrganizationInvite,
  OrganizationInviteCollection
} from "./organization_invite.schema";

@Injectable()
export class OrganizationInviteRepository {
  constructor(
    @InjectModel(OrganizationInviteCollection)
    private readonly organizationInvite: Model<OrganizationInvite>
  ) {}

  async sendInvite(data: IOrganizationInviteWithUserId) {
    return await this.organizationInvite.create(data);
  }

  async findMyInvites(user_email: string) {
    return await this.organizationInvite
      .find({ user_email: user_email })
      .populate("organization_id")
      .populate("user_id");
  }
}
