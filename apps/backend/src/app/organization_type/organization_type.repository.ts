import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  OrganizationType,
  OrganizationTypeCollection
} from "./organization_type.schema";
import { AutocompleteRepository } from "../core/generic/autocomplete/autocomplete.repository";

@Injectable()
export class OrganizationTypeRepository extends AutocompleteRepository<OrganizationType> {
  constructor(
    @InjectModel(OrganizationTypeCollection)
    private readonly organizationTypeModel: Model<OrganizationType>
  ) {
    super(organizationTypeModel);
  }
}
