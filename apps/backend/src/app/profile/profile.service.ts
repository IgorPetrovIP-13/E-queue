import { Injectable } from "@nestjs/common";
import { IUpdateProfileReq } from "@repo/api/services/profile/profile.types";
import { Types } from "mongoose";
import { UserService } from "../user/user.service";

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService) {}

  async get(userId: Types.ObjectId) {
		// @ts-ignore
    const { password, ...payload } = await this.userService.findById(userId);
    return payload;
  }

  async update(userId: Types.ObjectId, data: IUpdateProfileReq) {
    return await this.userService.update(userId, data);
  }

  async delete(userId: Types.ObjectId) {
    return await this.userService.delete(userId);
  }
}
