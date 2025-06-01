import { Injectable } from "@nestjs/common";
import { Organization, OrganizationCollection } from "./organization.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(OrganizationCollection)
    private readonly organizationModel: Model<Organization>
  ) {}

  async create(data: Partial<Organization>): Promise<Organization> {
    const organization = new this.organizationModel(data);
    return organization.save();
  }

  async findByIds(ids: Types.ObjectId[]): Promise<Organization[]> {
    return this.organizationModel
      .find({ _id: { $in: ids } })
      .populate("organization_type_id")
      .populate({
        path: "members",
        populate: {
          path: "user_id"
        }
      })
      .lean()
      .exec();
  }

  async addQueue(id: string, queueId: string) {
    return this.organizationModel.findByIdAndUpdate(
      id,
      { $addToSet: { static_queues: queueId } },
      { new: true }
    );
  }

  async addDynamicQueue(id: string, dynamicQueueId: string) {
    return this.organizationModel.findByIdAndUpdate(
      id,
      { $addToSet: { dynamic_queues: dynamicQueueId } },
      { new: true }
    );
  }

	async deleteDynamicQueue(id: string, dynamicQueueId: string) {
		return this.organizationModel.findByIdAndUpdate(
			id,
			{ $pull: { dynamic_queues: dynamicQueueId } },
			{ new: true }
		);
	}
}
