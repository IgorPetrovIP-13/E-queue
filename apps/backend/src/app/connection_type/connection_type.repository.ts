import { Injectable } from "@nestjs/common";
import { AutocompleteRepository } from "../core/generic/autocomplete/autocomplete.repository";
import {
  ConnectionType,
  ConnectionTypeCollection
} from "./connection_type.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ConnectionTypeRepository extends AutocompleteRepository<ConnectionType> {
  constructor(
    @InjectModel(ConnectionTypeCollection)
    private readonly connectionType: Model<ConnectionType>
  ) {
    super(connectionType);
  }
}
