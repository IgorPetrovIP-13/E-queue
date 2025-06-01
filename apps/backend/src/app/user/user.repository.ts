import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserCollection } from "./user.schema";
import { Model, Types } from "mongoose";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserCollection) private readonly userModel: Model<User>
  ) {}

  async create(data: CreateUserDTO) {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async update(id: Types.ObjectId, data: UpdateUserDTO) {
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
  }

  async findById(id: Types.ObjectId) {
    return this.userModel.findById(id).lean().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }

	async addOrganization(
		user_id: Types.ObjectId,
		organization_id: Types.ObjectId
	) {
		return this.userModel
			.findByIdAndUpdate(
				user_id,
				{ $addToSet: { organizations: organization_id } },
				{ new: true }
			)
			.lean()
			.exec();
	}

  async delete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id).lean().exec();
  }
}
