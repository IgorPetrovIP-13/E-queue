import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { User } from "./user.schema";
import { Types } from "mongoose";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: Types.ObjectId, data: UpdateUserDTO) {
    try {
      return await this.userRepository.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: Types.ObjectId) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addOrganization(
    user_id: Types.ObjectId,
    organization_id: Types.ObjectId
  ) {
    try {
      return await this.userRepository.addOrganization(
        user_id,
        organization_id
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
