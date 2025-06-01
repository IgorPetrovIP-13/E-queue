import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserOrganizationRepository } from "./user_organizations.repository";
import { CreateUserOrganizationDTO } from "./typedefs";
import { Types } from "mongoose";
import { UserService } from "../user/user.service";

@Injectable()
export class UserOrganizationService {
  constructor(
    private readonly userOrganizationRepository: UserOrganizationRepository,
    private readonly userService: UserService
  ) {}

  async create(data: CreateUserOrganizationDTO) {
    try {
			await this.userService.findById(data.user_id);
      return await this.userOrganizationRepository.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByUserId(user_id: Types.ObjectId) {
    try {
      return await this.userOrganizationRepository.findByUserId(user_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
