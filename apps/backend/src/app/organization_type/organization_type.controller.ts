import { Controller, Get, UseGuards } from "@nestjs/common";
import { OrganizationTypeService } from "./organization_type.service";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";

@UseGuards(AccessTokenGuard)
@Controller("organization-types")
export class OrganizationTypeController {
  constructor(
    private readonly organizationTypeService: OrganizationTypeService
  ) {}

  @Get("autocomplete-data")
  async getAutocompleteData() {
    return this.organizationTypeService.getAutocompleteData();
  }
}
