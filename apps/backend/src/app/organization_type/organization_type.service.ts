import { Injectable } from "@nestjs/common";
import { OrganizationTypeRepository } from "./organization_type.repository";
import { OrganizationType } from "./organization_type.schema";
import { AutocompleteService } from "../core/generic/autocomplete/autocomplete.service";

@Injectable()
export class OrganizationTypeService extends AutocompleteService<OrganizationType> {
  constructor(
    private readonly organizationTypeRepository: OrganizationTypeRepository
  ) {
    super(organizationTypeRepository);
  }
}
