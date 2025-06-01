import { Injectable, Logger } from "@nestjs/common";
import { Organization } from "./organization.schema";
import { ObjectId } from "mongodb";
import { OrganizationRoles } from "@repo/core/enums/org-roles";
import { OrganizationRepository } from "./organization.repository";
import { Types } from "mongoose";
import { CreateOrganizationDTO } from "./typedefs";
import { UserOrganizationService } from "../user_organizations/user_organizations.service";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly userOrganizationService: UserOrganizationService
  ) {}

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    const objectId = new ObjectId();

    const userOwner = await this.userOrganizationService.create({
      user_id: data.user_id,
      organization_id: objectId,
      organization_role: OrganizationRoles.OWNER
    });

    const dataWithId = {
      _id: objectId,
      organization_logo: data.organization_logo,
      organization_type_id: data.organization_type_id,
      organization_title: data.organization_title,
      organization_description: data.organization_description,
      organization_website: data.organization_website,
      members: [userOwner._id as unknown as Types.ObjectId],
      static_queues: [],
      dynamic_queues: []
    };

    return await this.organizationRepository.create(dataWithId);
  }

  async findByUserId(user_id: Types.ObjectId): Promise<Organization[]> {
    const userOrgs = await this.userOrganizationService.findByUserId(user_id);
    const orgIds = userOrgs.map(org => org.organization_id);

    return await this.organizationRepository.findByIds(orgIds);
  }

  async addQueue(organization_id: string, queue_id: string) {
    return await this.organizationRepository.addQueue(
      organization_id,
      queue_id
    );
  }

  async addDynamicQueue(organization_id: string, dynamic_queue_id: string) {
    return await this.organizationRepository.addDynamicQueue(
      organization_id,
      dynamic_queue_id
    );
  }

  async deleteDynamicQueue(organization_id: string, dynamic_queue_id: string) {
    return await this.organizationRepository.deleteDynamicQueue(
      organization_id,
      dynamic_queue_id
    );
  }
}
