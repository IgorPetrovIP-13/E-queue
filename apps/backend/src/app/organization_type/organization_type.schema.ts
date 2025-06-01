import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Autocomplete } from "../core/generic/autocomplete/autocomplete.schema";

export const OrganizationTypeCollection = "organization_types";

@Schema({ versionKey: false })
export class OrganizationType extends Autocomplete {}

export const OrganizationTypeSchema =
  SchemaFactory.createForClass(OrganizationType);
