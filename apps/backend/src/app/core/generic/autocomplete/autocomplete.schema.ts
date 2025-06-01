import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class Autocomplete extends Document {
  _id: string;

  @Prop()
  title: string;
}

export const GenericAutocompleteSchema =
  SchemaFactory.createForClass(Autocomplete);
