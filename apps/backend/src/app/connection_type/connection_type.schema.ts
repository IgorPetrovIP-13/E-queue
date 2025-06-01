import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Autocomplete } from "../core/generic/autocomplete/autocomplete.schema";

export const ConnectionTypeCollection = "connection_types";

@Schema({ versionKey: false })
export class ConnectionType extends Autocomplete {}

export const ConnectionTypeSchema =
  SchemaFactory.createForClass(ConnectionType);
