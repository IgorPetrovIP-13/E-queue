import { Injectable } from "@nestjs/common";
import { AutocompleteService } from "../core/generic/autocomplete/autocomplete.service";
import { ConnectionType } from "./connection_type.schema";
import { ConnectionTypeRepository } from "./connection_type.repository";

@Injectable()
export class ConnectionTypeService extends AutocompleteService<ConnectionType> {
  constructor(
    private readonly connectionTypeRepository: ConnectionTypeRepository
  ) {
    super(connectionTypeRepository);
  }
}
