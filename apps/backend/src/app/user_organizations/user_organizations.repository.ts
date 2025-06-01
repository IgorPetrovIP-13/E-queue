import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserOrganizationDTO } from "./typedefs";
import {
  UserOrganization,
  UserOrganizationsCollection
} from "./user_organizations.schema";

@Injectable()
export class UserOrganizationRepository {
  constructor(
    @InjectModel(UserOrganizationsCollection)
    private readonly userOrganizationModel: Model<UserOrganization>
  ) {}

  async create(data: CreateUserOrganizationDTO) {
    const createdUserOrganization = new this.userOrganizationModel(data);
    return createdUserOrganization.save();
  }

  async findByUserId(user_id: Types.ObjectId) {
    return this.userOrganizationModel
      .find({ user_id: user_id })
      .lean()
      .exec();
  }
}
