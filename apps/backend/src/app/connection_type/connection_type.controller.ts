import { Controller, Get, UseGuards } from "@nestjs/common";
import { ConnectionTypeService } from "./connection_type.service";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";

@UseGuards(AccessTokenGuard)
@Controller("connection-types")
export class ConnectionTypeController {
  constructor(private readonly connectionTypeService: ConnectionTypeService) {}
  @Get("autocomplete-data")
  async getAutocompleteData() {
    return this.connectionTypeService.getAutocompleteData();
  }
}
